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
 * @class  App 
 * @module   { Object } Game The record set's id number.
 * @module   { Object } Footer      [description]
 * @module   { Object } Footer      [description]
 * @module   { Object } EvenSystem   [description]
 * @property { Array  } [games] [description]
 * @property { Board  } [board] [description]
 * @property { Object } [solution] [description]
 **************************************************************************/

class App {

    /**************************************************************************
     * @constructor 
     * @param    { Object } props The record set's id number.
     * @param    { Object } events      [description]
     * @property { Number } [difficulty]     [description]
     * @property { Array  } [games] [description]
     * @property { Board  } [board] [description]
     * @property { Object } [solution] [description]
     **************************************************************************/

    constructor() {

        let modules = {
            Game,
            Header,
            Footer
        };

        this.events = new EventSystem();
        /** @function */
        this.service = dataservice.getGames;

        let _props = defaultProps;


        /* initialize modules for App */
        this.initialize(modules, _props);
    }

    /**
     * [initialize description]
     * @param  {[type]} modules [description]
     * @param  {[type]} props   [description]
     * @return {[type]}         [description]
     */
    
    initialize(modules, props) {
        /** @function */
        let getMoreGames = this.getData;

        this.Header = new modules.Header(
            this.events,
            props
        );

        this.Game = new modules.Game(
            this.events,
            props
        );

        this.Footer = new modules.Footer(
            getMoreGames,
            this.events,
            props
        );

        return this.getData();
    }

    /**
     * [getData description]
     * @return {[type]} [description]
     */
    
    getData() {
        return this.service(this.handleRequest.bind(this));
    }


    /**
     * [handleRequest description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    
    handleRequest(data) {

        let promise = new Promise((resolve) => {
            let allBoards = _.map(data, e => e);
            resolve(allBoards);
        });

        promise
            .then((allBoards) => 
                this.Game.initialize(allBoards))
            .catch((doh)  => 
                $logger(doh))
            .then(()      => 
                this.Header.initialize())
            .catch((doh)  => 
                $logger(doh))
            .then(()      => 
                this.Footer.initialize())
            .catch((doh)  => 
                $logger(doh))
            .then(()      => 
                this.events.emit('loaded'));
    }
}

/*load App when ready*/
(( $, _ ) => {

    $(document).ready(function() {
        new App();
    });

})( $, _ );

 /**
  * Global logger that logs app error messages 
  * @param  {string} message [description]
  * @param  {array} args 
  */
 function $logger(message, ...args) {
     console.error.apply(console, [message].concat(args));
     console.trace();
 }
