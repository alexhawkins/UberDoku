/* {  assets  } */
import "./assets/stylesheets/base";
import dataservice from "./utils/DataService";
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

        this.name = 'Uberdoku';
        this.difficulty = 50;
        /**********************************************************
         * instantiate components for Sedoku
         **********************************************************/
        this.STORE = new Map();
        let props = {
            name: 'John',
            array:[0,2]
        }
        this.STORE.set('props', props);

        this.Events = new EventSystem();
        this.Header = new Header(this.Events, this.difficulty, this.STORE);
        this.Game = new Game(this.Events, this.difficulty);
        this.Footer = new Footer(this.Events, this.difficulty);

        /* initialize components for Sedoku */
        this.initialize();
    }

    initialize() {
        return dataservice.getGames(this._loadGames.bind(this));
    }



    _loadGames(games) {
        /* Promise.all takes an array of promises and creates a 
           promise that fulfills when all modules successfully load. */

        let promise = new Promise(function(resolve) {
            let allBoards = _.map(games, e => e);
            resolve(allBoards)
        });

        promise
            .then((allBoards) => this.Game.initialize(allBoards))
            .catch((doh) => console.log(doh))
            .then(() => this.Header.initialize())
            .catch((doh) => console.log(doh))
            .then(() => this.Footer.initialize())
            .catch((doh) => console.log(doh))
            .then(() => this.Events.emit('loaded'));
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

/*load Sedoku when ready*/
$(document).ready(function() {
    return new App();
});



export default App;
