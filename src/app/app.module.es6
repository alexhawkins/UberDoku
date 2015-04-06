"use strict";
/* {  assets  } */
import "./assets/stylesheets/base";
import dataservice from "./utils/DataService";
import defaultProps from "./utils/defaultProps";
/* {  utils  } */
import {
    Promise
}
from 'es6-promise';

/* {  modules  } */
import Game from "./modules/game/game.module";
import Footer from "./modules/footer/footer.module";
import Header from "./modules/header/header.module";
import EventSystem from "./utils/EventSystem";

/**********************************************************
 * Sedoku Class
 ***********************************************************/

class App {

    constructor() {

        let modules = {
            Game,
            Header,
            Footer
        };

        this.events = new EventSystem();
        this.service = dataservice.getGames;

        let _props = defaultProps;


        /* initialize components for Sedoku */
        this.initialize(modules, _props);
    }

    initialize(modules, props) {
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
        // this.Header = new Header(this.Events, this.difficulty, this.STORE);
        // this.Game = new Game(this.Events, this.difficulty);
        // this.Footer = new Footer(this.Events, this.difficulty);
        
    }

    getData(){
        return this.service(this._handleRequest.bind(this));
    }


    _handleRequest(data) {
        /* Promise.all takes an array of promises and creates a 
           promise that fulfills when all modules successfully load. */

        let promise = new Promise((resolve) => {
            let allBoards = _.map(data, e => e);
            resolve(allBoards);
        });

        promise
            .then((allBoards) => this.Game.initialize(allBoards))
            .catch((doh) => console.log(doh))
            .then(() => this.Header.initialize())
            .catch((doh) => console.log(doh))
            .then(() => this.Footer.initialize())
            .catch((doh) => console.log(doh))
            .then(() => this.events.emit('loaded'));
    }

    //     return Promise.all([this.Game, this.Footer, this.Header])
    //         .then(()     => {  this.Header.initialize();  })
    //         .catch((doh) => {  console.log(doh);        })
    //         .then(()     => {  this.Game.initialize();  })
    //         .catch((doh) => {  console.log(doh);        })
    //         .then(()     => {  this.Footer.initialize();    })
    //         .catch((doh) => {  console.log(doh);        })
    //         .then(()     => {  console.log('loaded');   });
    // }
}

/*load Uberdoku when ready*/
$(document).ready(function() {
    return new App();
});



export default App;
