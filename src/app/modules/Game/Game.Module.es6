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

/*************************************************************************
 * Clase: Game                                                           *
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
     * defines the func to represent our Class. our class method
     ********************************************************************/

    constructor(difficulty = 50, score = 0) {

        const vm = this;
        vm.props = {
            name: 'Game',
            difficulty: difficulty,
            score: score;
            time: 0;
        }

        /*******************************************************************
         * Private Variables
         ******************************************************************/

        /*=> NOTE: WeakMap() should be used if you're truely concerned about
             about privacy and garbage collection. We're going to use the 
             new ES6 Map data structure since it provides many nice features
             for finding and retrieving data. Note, a JS {} would work just 
             as well but Map is new and cool. There is also Set() and 
             WeakSet(). Sweet <=*/

        let _allBoards = new Map();
        let _solution = new Map();
        let _gameBoard = new Map();

        /********************************************************************
         * Getters and Setters for private variables (Below)
         *==================================================================*
         * At the very least, we can prevent direct access to data (like the
         * answers to the sedoku puzzle) by forcing you to go through custom
         * getters and setters. ES6 has built in get and set methods as well
         * which can be useful for sharing information between modules. 
         * 
         * However, since our data flow is unidirectional and propagates
         * through props, such methods should not be neccessary. We only
         * want to access state internally through the props object.
         ********************************************************************/

        vm.setBoards = (l) => _allBoards.set('all', l);
        vm.getBoards = () => _allBoards;
        vm.setSolution = (o) => _solution.set('solution', o);
        vm.getSolution = () => _solution;
        vm.setGame = (l) => _gameBoard.set('solution', l);
        vm.getGame = () => _gameBoard;

    }

    /**************************************************************************
     * Game.Prototype.intialize 
     *========================================================================*
     * is a prototype Fn & can be inherited by classes it extends to
     **************************************************************************/

    initialize(data) {
        const vm = this;
        vm.setData(data);
        vm._setListeners();
    }

    /**************************************************************************
     * Game.Prototype.getData 
     *========================================================================*
     * 
     **************************************************************************/

    getData() {
        const vm = this;
        return uberUtils.getGames(vm.setBoardData.bind(vm));
    }

    /**************************************************************************
     * Game.Prototype.setData 
     *========================================================================*
     * 
     **************************************************************************/

    setData(data) {
        const vm = this;
        let promise = new Promise(function(resolve) {
            let allBoards = _.map(data, e => e);
            vm.setBoards(allBoards);
            resolve(allBoards);
        });

        promise
            .then((allBoards) => vm.createSolution(allBoards))
            .catch((doh) => console.log(doh))
            .then((solution) => vm.createGame(solution))
            .catch((doh) => console.log(doh))
            .then((game) => vm.setGame(game))
            .catch((doh) => console.log(doh));
    }

    /**************************************************************************
     * Game.prototype.createSolution
     *========================================================================*
     * creates solution board f/ Queue of boards.
     * Removes current board from Queue to prevent Ground Hog Day Effect 
     * ************************************************************************/

    createSolution(allBoards) {
        const vm = this;
        vm.setSolution(allBoards.shift());
        return vm.getSolution();
    }

    /**************************************************************************
     * Game.prototype.createGame 
     *========================================================================*
     * creates new instance of Board Class. Note how we pass props upon 
     * instantiation instead initializing state within the actual board class. 
     * This would be fine but it become difficult to keep track of state with 
     * increased app complexity. It's worth spending the time to think about 
     * state and separate deterministic app componenets into seperated modules.
     * ES6 makes this a breeze with native ipmort and export functionality
     ***************************************************************************/

    createGame(solution) {
        const vm = this;

        let gameBoard = new Board(
            solution,
            vm.props.difficulty
        );

        return gameBoard;
    }

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
     * But hmm....we've...wouldn't this be cheating? Because we already decided
     * to maintain state in our UberDoku module!. So that is where it must be 
     * changed. 
     * *=============================*
     * It makes sense if you think about it. Everytime there is a relevant change
     * of state in our app, the other components relying on that data also 
     * need to be updated. We could cross-pollinate between modules but as the
     * app grows in size, it would become difficult to know what was changing
     * what and where. Maintaining state in one place makes things easy on us.  
     ***************************************************************************/

    newGame() {
        const vm = this;
        let allGames = vm.getBoards().get('all');
        if allGames.length > 0
            vm.setBoardData(all); 
        else  /* we need an event emitter here */
    }

    /*============================ Static Class Methods ========================*/



    /**************************************************************************
     * _SetListeners
     *========================================================================*/

    _setListeners() {
        const vm = this;
    }
}


export default Game;
