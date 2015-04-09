'use strict';
import './assets/stylesheets/base';
import defaultProps    from './utils/defaultProps';

import {  Promise  }   from 'es6-promise';

import Game            from './modules/game/game.module';
import Footer          from './modules/footer/footer.module';
import Header          from './modules/header/header.module';
import EventSystem     from './utils/EventSystem';
import SudokuMaker     from './utils/SudokuMaker';
/**************************************************************************
 * @class               App 
 * @module   { Object } Game         - where state of the game is set
 * @module   { Object } Footer       - holds  game controls
 * @module   { Object } Header       - holds difficulty meter
 * @module   { Object } EventSystem  - keeps track of events
 * @property { Map    } [games]      - a map Ojbect of all sedoku games
 * @property { Array  } [board]      - holds the current game
 * @property { Number } [difficulty] - keeps track of game difficulty
 * @property { Array  } [solution]   - holds the current solution to the 
 *                                     game being played.
 **************************************************************************/

class App {

    /**************************************************************************
     * @constructor 
     * @param    { Function } service - stores func that makes request for games
     * @param    { Object   } modules - holds submodules for injection
     * @callback { Function } getMoreGames - gets more sudoku boards when out   
     **************************************************************************/

    constructor( ) {

        let modules  = {

            Game,
            Header,
            Footer
        };

        let _props         = defaultProps;
        this.name          = 'Uberdoku';
        this.events        = new EventSystem( );        
        this.games         = this.generateBoards;
        this.getMoreGames  = this.getData;
       
        this.getProps = ( ) => _props;      /* private getter method */
        this.initialize( modules, _props ); /* initialize modules for App */
    }

    /***************************************************************************
     * initializes app by instantiating main components
     * and initializing data request
     * @param  {[Object]} modules - app modules for injection
     * @param  {[Object]} props - default props passed to components
     * @return {[Object]} = a data object
     ***************************************************************************/
    
    initialize( modules, props ) {

        this.Header = new modules.Header(
            this.events,
            props
        );

        this.Game   = new modules.Game(
            this.needMore,
            this.events,
            props
        );

        this.Footer = new modules.Footer(
            this.events,
            props
        );

        return this.getData( );
    }

    /*generate 50 boards at a time*/
    generateBoards( handleRequest ){

        let allBoards = [];

        for(let i = 0; i < 50; i++){
            let board = new SudokuMaker( );
            allBoards.push(board.initialize());
        }

        return handleRequest( allBoards );
    }

     /************************************************************************
     * [getData description]
     * @return {[type]} [description]
     *************************************************************************/
    
    getData( ) {
        return ( this.games( this.handleRequest.bind(this) ));
    }


    /*************************************************************************
     * [handleRequest description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     *************************************************************************/
    
    handleRequest( data ) {
        console.log(data);
        let promise = new Promise(( resolve ) => {
            resolve(data);
        });

        promise
            .then((data) => 
                this.Game.initialize(data))
            .catch((doh)  => 
                $logger(doh))
            .then(( )      => 
                this.Header.initialize())
            .catch((doh)  => 
                $logger(doh))
            .then(( )      => 
                this.Footer.initialize())
            .catch((doh)  => 
                $logger(doh))
            .then(( )      => 
                this.events.emit('loaded'));
    }
}

/**************************LOAD APP WHEN READY *******************************/

(( $, _ ) => {

    $(document).ready(( ) => new App( ));

})( $, _ );

 /*********************************************
  * Global logger that logs app error messages 
  * @param  {string} message [description]
  * @param  {array} args 
  *********************************************/

 function $logger(message, ...args) {
     console.error.apply(console, [message].concat(args));
     console.trace();
 }

export default App;