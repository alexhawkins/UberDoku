"use strict";
/********* Uberdoku defined assets *************************************/
import "./assets/stylesheets/base";
import EventSystem from "./utils/EventSystem";

/********* UberDoku defined modules ************************************/
import Game from "./modules/Game/Game.Module";


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
        vm.props = new Map().set("props", vm.getDefaultProps());
        vm.options = new Map().set("options", vm.getDefaultOptions());
        vm.state = new Map().set("state", vm.props.get("props"));
    }


    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * UberDoku.Prototype.intialize is a prototype Fn that allows us to
     * initialize the _STATE of our game upon Class instantiation.
     * In this case, we are grabbing the game data we need via an ajax
     * request; passing it a callback (our _loadGames method). We then
     * use es6 native promises to make sure each component is ready before
     * rendering our Game. We"ll use a JQuery fade in animation as a
     * secondary measure to protect against potential FOUCS. (see Game.Module)
     * A anmiated loader is also a possibility if time permits.
     *
     * NOTE: It"s important that we load all of our initial data here in our
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
        vm.setListeners();
        vm.render();
    }

    getDefaultProps() {
        return {
            clear: false,
            toggle: false,
            newgame: false,
            difficulty: 25,
            score: 0,
            events: new EventSystem(),
            stores: {
                answers: new Map(),
                games: [],
                board: []
            }
        };
    }

    getDefaultOptions() {
        return {

            name: "uberdoku",
            template: "",
            el: "#app",
            colors: {
                uberRed: "#D03E27",
                uberBlack: "#06060F",
                uberNavy: "#070716",
                uberBlue: "#1FBAD6",
                uberBlue2: "#1CA8C3"
            },
            readOnly: false
        };
    }


    render() {
        const vm = this;
        vm.Game = new Game(
            vm.options,
            vm.props,
            vm.state
        );
    }


    setListeners() {
        //const vm = this;
        // let events = getStateOf("events");
        // events.on("newgame", (args) => {
        //         let gamesLeft = args.getAllGames();
        //         if (gamesLeft.length > 0)
        //             vm.onLoad(gamesLeft); // render a new page
        //     }
        // }
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
