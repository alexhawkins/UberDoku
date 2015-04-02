"use strict";
/********* Uberdoku defined assets *************************************/
import "./assets/stylesheets/base";
import uberUtils from "./utils/uberUtils";

/********* Vendor defined modules & assets *****************************/
import {
    Promise
}
from "es6-promise";
/********* UberDoku defined modules ************************************/
//import Board from "./modules/Board/Board.Module";
//import Game from "./modules/Game/Game.Module";
import Footer from "./modules/Footer/Footer.Module";
import Header      from "./modules/Header/Header.Module";
import EventSystem from "./utils/EventSystem";

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
        vm.Events = new EventSystem();
        let _STATE = {
            uberdoku : vm,
            difficulty: 50,
            score: 0,
            events: vm.Events,
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

        vm.getAllGames = () => _STATE.data.allGames;
        vm.setAllGames = (games) => _STATE.data.allGames = games;
        vm.getCurrGame = () => _STATE.data.currGame;
        vm.setCurrGame = (game) => _STATE.data.currGame.push(game);
        vm.getProps = (property) => _STATE[property];
        vm.setProps = (property, val) => _STATE[property] = val;
        vm.getAllProps = () => _STATE;
    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * UberDoku.Prototype.intialize is a prototype Fn that allows us to
     * initialize the _STATE of our game upon Class instantiation.
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
        return uberUtils.getGames(vm.onLoad.bind(vm));

        /* Here, we are fetching json game data. Note that we are binding 
         * context to the _loadGames method. For those familiar with ES6,
         * this might seem strange. The use of bind is typically uneccessary as
         * the functionality is native. However, because of the nature of
         * this callback, bind comes in handy here.*/

    }

    onLoad(games) {

        const vm = this;
        let tempGames, 
            promise, 
            allProps;

        tempGames = _.map(games, e => e);

        promise = new Promise((resolve) => {
            allProps = vm.setProperties(tempGames);
            resolve(allProps);
        });

        return promise
            .then((props) => vm.instantiate(props))
            .catch((doh) => console.log(doh))
            .then((modules) => vm.render(modules))
            .catch((doh) => console.log(doh))
            .then(() => vm.Events.emit('loaded'));
    }

    setProperties(games) {
        const vm = this;
        let currGame;
        vm.setAllGames(games);
        currGame = vm.getAllGames().shift();
        vm.setCurrGame(currGame);
        return vm.getAllProps();
    }

    /****************************************************************
    * instantiate module Classes for UberDoku
    /***************************************************************/

    instantiate(props) {
        const vm = this;
        console.log(props);
        vm.Header = new Header(props);
        //vm.Game = new Game(props);
        //vm.Board = new Board(props);
        vm.Footer = new Footer(props);
        let modules = { header: vm.Header };
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


export default UberDoku;
