/*     {  UberDoku defined assets         }   */
import  "../../assets/stylesheets/base";
/*     {  Vendor defined modules & assets }   */   
import { Promise } from 'es6-promise';
 /*    {  UberDoku define modules         }   */     
import Board from "../board/Board.Module";


/***********************************************
* Game Class                                   *
************************************************
* File: Game.Module.js
* **********************************************
* Description: the main module for Uberdoku where
* client-side state is generally mantained. Cross
* polination between modules allows us to commun-
* icate with other modules from a singular point.
* This architectural deciscion will prove useful
* as Uberdoku grows in both size and complexity.
/*---------------------------------------------*/

class Game {

    /********************************************
    * Game.Prototype.constructor defines the func
    * to represent our Class. Our class method
    ********************************************/

    constructor() {

        const vm = this;
        vm.name  = 'Game';

    }

    /*============ Prototype Methods ==========*/

    /********************************************
    * Game.Prototype.intialize is prototype func
    * & can be inherited by classes it extends to
    ********************************************/

    initialize() {
        const vm = this;
    }

    /*============== Class Methods =============*/

}


/*************************************************
* Load Game when ready and initialze our Class
* ***********************************************/

$(document).ready(function(){
    let Game = new Game();
    
    Game.initialize( );
});


export default Game;
