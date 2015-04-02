/********* Uberdoku defined assets *************************************/
import "./assets/stylesheets/base";
/********* Vendor defined modules & assets *****************************/
import {
    Promise
}
from "es6-promise";
/********* UberDoku defined modules ************************************/
import Game from "./modules/Board/Board.Module";
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
        vm.props = {
            name: "UberDoku",
            difficulty: 50,
            score: 0
        }

        /****************************************************************
        * instantiate module Classes for UberDoku
        /***************************************************************/

        vm.Header = new Header(vm.props.difficulty);
        vm.Game = new Game(vm.props.difficulty);
        vm.Footer = new Footer(vm.props.difficulty);

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
         * this might strange. The use of bind is typically uneccessary as
         * the functionality is native. However, because of the nature of 
         * this callback, bind comes in handy as always.*/ 

        return uberUtils.getGames(vm._loadGames.bind(vm));
    }

    /*============================ Class Methods ========================*/

    _loadGames(games) {
        const vm = this;

        let promise = new Promise(function(resolve) {
            let allBoards = _.map(games, e => e);
            resolve(allBoards)
        });

        promise
            .then((allBoards) => vm.Game.initialize(allBoards))
            .catch((doh) => console.log(doh))
            .then(() => vm.Header.initialize())
            .catch((doh) => console.log(doh))
            .then(() => vm.Footer.initialize())
            .catch((doh) => console.log(doh))
            .then(() => vm.Events.emit('loaded'));
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
