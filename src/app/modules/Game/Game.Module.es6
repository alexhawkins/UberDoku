/********* Uberdoku defined assets *************************************/
import "./assets/stylesheets/base";
/********* Vendor defined modules & assets *****************************/
import { Promise } from "es6-promise";
/********* UberDoku defined modules ************************************/
import Board from "./modules/Board/Board.Module";

/************************************************************************
* Game Class                                                            *
*************************************************************************
* File: Game.Module.js
* ***********************************************************************
* Description: the main module for Uberdoku where client-side state is 
* generally mantained. Cross pollination between modules allows us to 
* communicate with other modules from a singular point. This architectural 
* deciscion will prove useful as Uberdoku grows in both size & complexity.
/*---------------------------------------------------------------------*/

class Game {

    /********************************************************************
     * Game.Prototype.constructor defines the func to represent our Class. 
     * our class method
     ********************************************************************/

    constructor() {

        const vm = this;
        vm.name = 'Game';

    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Game.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to
     *********************************************************************/

    initialize() {
        const vm = this;
    }

    /*============================ Class Methods ========================*/

}


export default Game;
