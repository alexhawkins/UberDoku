'use strict';
import './assets/stylesheets/base';
import dataservice   from './utils/DataService';
import defaultProps  from './utils/defaultProps';

import {  Promise  } from 'es6-promise';

import Game          from './modules/game/game.module';
import Footer        from './modules/footer/footer.module';
import Header        from './modules/header/header.module';
import EventSystem   from './utils/EventSystem';

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
     * @param  { Function } service - stores func that makes request for games
     * @param  { variable } modules - holds submodules for injection
     **************************************************************************/

    constructor( ) {

        let modules  = {

            Game,
            Header,
            Footer
        };

        let _props    = defaultProps;
        this.name     = 'Uberdoku';
        this.events   = new EventSystem( );
        /** @function */
        this.service  = dataservice.getGames;
        /* private getter method */
        this.getProps = ( ) => _props;
        /* initialize modules for App */
        this.initialize( modules, _props );
    }

    /**************************************************************************
     * initializes app by instantiating main components
     * and initializing data request
     * @param  {[Object]} modules - app modules for injection
     * @param  {[Object]} props - default props passed to components
     * @return {[Object]} = a data object
     *************************************************************************/
    
    initialize( modules, props ) {
        /** @function */
        let getMoreGames = this.getData;

        this.Header = new modules.Header(
            this.events,
            props
        );

        this.Game   = new modules.Game(
            this.events,
            props
        );

        this.Footer = new modules.Footer(
            getMoreGames,
            this.events,
            props
        );

        return this.getData( );
    }

     /************************************************************************
     * [getData description]
     * @return {[type]} [description]
     *************************************************************************/
    
    getData( ) {
     return this.service(this.handleRequest.bind(this));
    }


    /*************************************************************************
     * [handleRequest description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     *************************************************************************/
    
    handleRequest( data ) {

        let promise = new Promise(( resolve ) => {
            let allBoards = _.map(data, e => e);
            resolve(allBoards);
        });

        promise
            .then((allBoards) => 
                this.Game.initialize(allBoards))
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