/********* Uberdoku defined modules & assets ***************************/
"use strict";
import "./Board.Style.scss";
import boardTpl from "./Board.Template";

/************************************************************************
 * Class: Game                                                           *
 * File: Game.Module.es6                                                 *
 * =======================================================================
 * Description: the Board module is where all the magic of the game
 * happens. This is where the actual Game Board is created and various
 * calculation regarding the state of the game are made. It is our 
 * workhorse method. Eventually, we will want to break the Board Module 
 * into further sub components/modules.
 *************************************************************************/

class Board {

    /*********************************************************************
     * Board.Prototype.constructor
     * ==================================================================*
     * defines the func to represent our Class. Our class method which
     * contains a PROPS object: a snapshot of the current state of our 
     * apps relevent properties
     *********************************************************************/

    constructor(props) {
        console.log('BOARD', props);
        const vm = this;

        let _PROPS = props;
        vm.el = "#board";
        vm.templat = boardTpl;
        vm.output = "";
    }


    /**********************************************************
     * Getters and Setters for private variables
     **********************************************************/


    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Board.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to or used by classes it is exported to. It will 
     * initalize our Board method so that it can be rendered to the View.
     *********************************************************************/

    initialize() {
        console.log('hello');
        const vm = this;
    }

    /*********************************************************************
     * Board.Prototype.render is a prototype Fn used to render the current
     * state of the Board component to to the View. Note that because it 
     * is a prototype method, rendering can be communicated between any  
     * other modules that Board is exported too 
     *********************************************************************/

    render() {
        const vm = this;
        return $(vm.props.el).html(vm.props.output);
    }

    /*============================ Class Methods ========================*/

    _setListeners() {
        const vm = this;
    }

}


export default Board;
