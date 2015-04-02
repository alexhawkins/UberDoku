"use strict";
/********* Uberdoku defined assets *************************************/
import "./assets/stylesheets/base";
import uberUtils from "../../utils/uberUtils";
/********* Vendor defined modules & assets *****************************/
import {
    Promise
}
from "es6-promise";
/********* UberDoku defined modules ************************************/
import Board from "./modules/Board/Board.Module";
import Game from "./modules/Game/Game.Module";
import Footer from "./modules/Footer/Footer.Module";
import Header from "./modules/Header/Header.Module";


/************************************************************************
* UberDoku Class                                                        *
*************************************************************************
* File: UberDoku.Module.js
* ***********************************************************************
* Description: the container module for all other modules where the main 
* components/modules of the game are instantiated.
/*---------------------------------------------------------------------*/

class UberDoku {

    /********************************************************************
     * UberDoku.Prototype.constructor defines func
     * to represent our Class. Our class method
     ********************************************************************/

    constructor() {
        /* only because vm looks prettier */
        const vm = this;
        let state = {
            difficulty: 50,
            score: 0,
            events: null,
            answers: {},
            data: {
                allGames: [],
                currGame: []
            }
        };

        /********************************************************************
         * Getters and Setters for initializing state (Below)
         *==================================================================*
         * At the very least, we can prevent direct access to data (like the
         * answers to the sedoku puzzle) by forcing you to go through custom
         * getters and setters. ES6 has built in get and set methods as well
         * which can be useful for sharing information between modules.
         *
         * However, since our data flow is unidirectional and state propagates
         * through props, such methods should not be neccessary. We only
         * want to access state internally via the props object.
         ********************************************************************/

        vm.getAllGames = () => state.data.allGames;
        vm.setAllGames = (games) => state.data.allGames = games;
        vm.getCurrGame = () => state.data.currGame;
        vm.setCurrGame = (game) => state.data.currGame.push(game);
        vm.getProps = (property) => state[property];
        vm.setProps = (property, val) => state[property] = val;
        vm.getAllProps = () => state;
    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * UberDoku.Prototype.intialize is a prototype Fn that allows us to
     * initialize the state of our game upon Class instantiation.
     * In this case, we are grabbing the game data we need via an ajax
     * request; passing it a callback (our _loadGames method). We then
     * use es6 native promises to make sure each component is ready before
     * rendering our Game. We'll use a JQuery fade in animation as a
     * secondary measure to protect against potential FOUCS. (see Game.Module)
     * A anmiated loader is also a possibility if time permits.
     *
     * NOTE: It's important that we load all of our initial data here in our
     * UberDoku container component. This allows us to initalize state in one
     * place. Above, note that we created a props object which we will use to
     * trickle down state to children components.
     *
     * Establishing a unidirectional flow of (as best we can w/o the use of
     * any framework) is essential for keeping track of our data as Uberdoku
     * grows in complexity. All data will be propagated through our props var
     * which updates all of the Modules that are affected.
     *********************************************************************/

    initialize() {
        const vm = this;

        /* here, we are fethcing json game data. Note that we are binding 
         * context to the _loadGames method. For those familiar with ES6,
         * this might seem strange. The use of bind is typically uneccessary as
         * the functionality is native. However, because of the nature of
         * this callback, bind comes in handy as always.*/

        return vm.Promise(vm.getData())
            .then((props) => vm._instantiate(props))
            .catch((doh) => console.log(doh))
            .then((modules) => vm.render(modules))
            .catch((doh) => console.log(doh))
            .then(() => vm.Events.emit("loaded"));




        //         .then(()     => {  vm.Header.initialize();  })
        //         .catch((doh) => {  console.log(doh);        })
        //         .then(()     => {  vm.Game.initialize();  })
        //         .catch((doh) => {  console.log(doh);        })
        //         .then(()     => {  vm.Footer.initialize();    })
        //         .catch((doh) => {  console.log(doh);        })
        //         .then(()     => {  console.log('loaded');   });

        //.then(() => vm.Events.emit('loaded'));
    }

    getData() {
        const vm = this;
        return uberUtils.getGames(vm._loadGames.bind(vm));
    }


    Promise(val, err) {
        return new Promise(function(resolve, reject) {
            if (err) reject(err);
            else resolve(val);
        });
    }


    _loadGames(games) {
        const vm = this;
        let tempGames,
            allGames,
            currGame;

        tempGames = _.map(games, e => e);
        vm.setAllGames(tempGames);
        allGames = vm.getAllGames();
        currGame = vm.getAllGames().shift();
        vm.setCurrGame(currGame);
        return vm.getAllProps();
    }

    /****************************************************************
    * instantiate module Classes for UberDoku
    /***************************************************************/
    _instantiate(props) {
        const vm = this;
        vm.Header = new Header(props);
        //vm.Game = new Game(props);
        //vm.Board = new Board(props);
        //vm.Footer = new Footer(props);
        let modules = {
            header: vm.Header,
            game: vm.Game,
            board: vm.Board,
            footer: vm.Footer
        };
        return modules;
    }

    render(modules) {
        modules.header.initialize();
        // modules.game.initialize();
        // modules.board.initialize();
        // modules.footer.initialize();
        // modules.footer.initialize();
    }

}

/**************************************************************************
 * Load Game when ready and initialze our UberDoku Class
 * ***********************************************************************/

$(document).ready(function() {
    let uberDoku = new UberDoku();
    uberDoku.initialize();
});


export
default UberDoku;
