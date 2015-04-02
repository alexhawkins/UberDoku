/********* Uberdoku defined assets *************************************/

/********* Vendor defined modules & assets *****************************/
import {
    Promise
}
from "es6-promise";
/********* UberDoku defined modules ************************************/
import Board from "../Board/Board.Module";
import Footer from "../Footer/Footer.Module";
import Header from ".../Header/Header.Module";

/*************************************************************************
 * Class: Game                                                           *
 * File: Game.Module.es6                                                 *
 * =======================================================================
 * Description: The main module for Uberdoku where client-side state is 
 * mantained. Cross pollination between modules allows us to communicate  
 * with other modules from a singular point. This architectural deciscion 
 * will prove useful as Uberdoku grows in both size & complexity.
 *************************************************************************/

class Game {

    /*********************************************************************
     * Game.Prototype.constructor
     * ==================================================================*
     * defines the func to represent our Class. our class method
     ********************************************************************/

    constructor(games, Events) {
        /* only because vm looks prettier */
        const vm = this;
        let _STATE = {
            game: vm,
            difficulty: 50,
            score: 0,
            events: Events,
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
        vm.getStateOf = (property) => _STATE[property];
        vm.setStateOf = (property, val) => _STATE[property] = val;
        vm.getState = () => _STATE;

    }

    /*=> NOTE: WeakMap() should be used if you're truely concerned about
         about privacy and garbage collection. We're going to use the 
         new ES6 Map data structure since it provides many nice features
         for finding and retrieving data. Note, a JS {} would work just 
         as well but Map is new and cool. There is also Set() and 
         WeakSet(). Sweet <=*/


    /**************************************************************************
     * Game.Prototype.intialize 
     *========================================================================*
     * is a prototype Fn & can be inherited by classes it extends to
     **************************************************************************/

    initialize(games) {
        const vm = this;
        vm.initializeState(games);
        vm._setListeners();
    }

    /**************************************************************************
     * Game.Prototype.initializeState
     *========================================================================*
     * 
     **************************************************************************/
    initializeSate(games) {
        const vm = this;
        let tempGames,
            promise,
            state;

        tempGames = _.map(games, e => e);

        promise = new Promise((resolve) => {
            state = vm._setSate(tempGames);
            resolve(state);
        });

        return promise
            .then((state) => vm.instantiateComponents(state))
            .catch((doh) => console.log(doh))
            .then((modules) => vm.render(modules))
            .catch((doh) => console.log(doh))
            .then(() => vm.Events.emit('state initialized'));
    }

    _setState(games) {
        const vm = this;
        let currGame;
        vm.setAllGames(games);
        currGame = vm.getAllGames().shift();
        vm.setCurrGame(currGame);
        return vm.getAllProps();
    }

    /****************************************************************
    * instantiate component modules for Games
    /***************************************************************/

    instantiateComponents(props) {
        const vm = this;
        //vm.Board = new Board(props);
        vm.Header = new Header(props);
        vm.Footer = new Footer(props);
        let modules = {
            header: vm.Header,
            footer: vm.Footer
            //board: vm.Board
        };
        return modules;
    }

    render(games) {
        //modules.board.initialize();
        modules.footer.initialize();
        modules.header.initialize();
    }

    /**************************************************************************
     * Game.prototype.createSolution
     *========================================================================*
     * creates solution board f/ Queue of boards.
     * Removes current board from Queue to prevent Ground Hog Day Effect 
     * ************************************************************************/


    /**************************************************************************
     * Game.prototype.createGame 
     *========================================================================*
     * creates new instance of Board Class. Note how we pass props upon 
     * instantiation instead initializing state within the actual board class. 
     * This would be fine but it becomes difficult to keep track of state with 
     * increased app complexity. It's worth spending the time to think about 
     * state and separate deterministic app componenets into seperate modules.
     * ES6 makes this a breeze with native ipmort and export functionality
     ***************************************************************************/



    /**************************************************************************
     * Game.prototype.newGame 
     *========================================================================*
     * creates a new a Game. It checks to see how many 
     * game boards are left in our Queue. If there are games left, it sets the
     * first in the queue as the new game. If none are left, we need
     * to make another request to our data Store. 
     * *=============================*
     * So what's happening here??? 
     * We're changing the state of our entire app. So we somehow need to get 
     * back to the UberDoku module to make a new Ajax Request. Implementing 
     * a custom Event Emitter would prove useful here. Then attaching a 
     * listener to the UberDoku class to recieve notifcations of state change. 
     * *=============================*
     * Of course, we could use JQuery for our eventing system but what's the
     * fun in that. Let's create our own basic Eventing System with basic on
     * and emit functionality.
     * *=============================*
     * Also note that we could totally import uberUtils into our Game module
     * and make the AJAX request internally. That's what I initially did. 
     * But hmm...wouldn't this be cheating? Because we already decided
     * to maintain state in our UberDoku module! So that is where it must be 
     * changed. And that settles that.
     * *=============================*
     * Hey, but tt makes sense if you think about it. Everytime there is a 
     * relevant change of state in our app, the other components relying on 
     * that data also need to be updated. We could cross-pollinate between 
     * modules but as the app scales, it would become difficult to know what 
     * was changing what and where. Maintaining state in one place makes 
     * things easy on us. We know exactly where to look=> UberDoku.module  
     ***************************************************************************/

    newGame() {
        const vm = this;

    }

    /**************************************************************************
     * _SetListeners
     *========================================================================*/

    _setListeners() {
        const vm = this;
    }
}


export default Game;
