/********* Uberdoku defined assets *************************************/
import "./assets/stylesheets/base";
/********* Vendor defined modules & assets *****************************/ 
import { Promise } from "es6-promise";
/********* UberDoku defined modules ************************************/ 
import Game        from "./modules/Board/Board.Module";
import Game        from "./modules/Game/Game.Module";
import Footer      from "./modules/Footer/Footer.Module";
import Header      from "./modules/Header/Header.Module";


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
        vm.name = "UberDoku";

        /****************************************************************
        * instantiate module Classes for UberDoku
        /***************************************************************/

        vm.Header = new Header();
        vm.Game = new Game();
        vm.Footer = new Footer();

    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
    * UberDoku.Prototype.intialize is a prototype Fn that allows us to 
    * initialize specific vars and methods upon Class instantiation.
    *********************************************************************/

    initialize() {
        const vm = this;
    }

    /*============================ Class Methods ========================*/

}

/**************************************************************************
 * Load Game when ready and initialze our Class
 * ***********************************************************************/

$(document).ready(function() {
    let uberDoku = new UberDoku();
    uberDoku.initialize();
});


export default UberDoku;
