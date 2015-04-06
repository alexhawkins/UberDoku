"use strict";
/* {  assets  } */
//import "./assets/stylesheets/base";
import dataservice from "./utils/DataService";
import EventSystem from "./utils/EventSystem";
import defaultProps from './utils/DefaultProps';
/* {  utils  } */
import {
    Promise
}
from 'es6-promise';

/* {  modules  } */
import Game from "./modules/game/game.module";
// import Footer from "./modules/footer/footer.module";
// import Header from "./modules/header/header.module";

/**********************************************************
 * App Class
 ***********************************************************/

class App {

    constructor() {

        this.events = new EventSystem();
        this.props = defaultProps;

        this.activate();
    }

    activate() {
        dataservice.getGames(this.handleRequest.bind(this));
    }

    setGames(data) {
        return _.map(data, e => e);
    }

    setBoard(games) {
        return games.shift();
    }

    setDefaults(...args) {
        return this.props[args[1]] = args[0];
    }

    handleRequest(data) {
        if (!data instanceof Object)
            throw new TypeError();
        /* initialize game data */
        let promise = new Promise((resolve) => {
            resolve(data);
        });

        promise
            .then((data) => this.setGames(data))
            .catch((err) => $log(err))
            .then((games) => this.setDefaults(games, 'games'))
            .catch((err) => $log(err))
            .then((games) => this.setBoard(games))
            .catch((err) => $log(err))
            .then((board) => this.setDefaults(board, 'board'))
            .catch((err) => $log(err))
            .then(() => this.render())
            .catch((err) => $log(err))
            .then(() => console.log('data initialized'));
    }


    render() {
        let game = new Game(
            this.props,
            this.events
        );
        return game;
    }

    // promise
    //     .then((allBoards) => vm.Game.initialize(allBoards))
    //     .catch((doh) => console.log(doh))
    //     .then(() => vm.Header.initialize())
    //     .catch((doh) => console.log(doh))
    //     .then(() => vm.Footer.initialize())
    //     .catch((doh) => console.log(doh))
    //     .then(() => vm.Events.emit('loaded'));
    //}

    //     return Promise.all([vm.Game, vm.Footer, vm.Header])
    //         .then(()     => {  vm.Header.initialize();  })
    //         .catch((doh) => {  console.log(doh);        })
    //         .then(()     => {  vm.Game.initialize();  })
    //         .catch((doh) => {  console.log(doh);        })
    //         .then(()     => {  vm.Footer.initialize();    })
    //         .catch((doh) => {  console.log(doh);        })
    //         .then(()     => {  console.log('loaded');   });
    // }
}


function $log(message, ...args) {
    console.error.apply(console, [message].concat(args));
    console.trace();
}

/* ----------------------------------------------------------------------------
 * DOM Ready
 * ----------------------------------------------------------------------------*/

$(() => {
    new App();
});



export default App;
