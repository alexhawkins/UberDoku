/********* Uberdoku defined modules & assets ***************************/
import "./Board.Style.scss";
import boardTemplate from "./Board.Template";

/************************************************************************
* Board Class                                                          *
*************************************************************************
* File: Board.Module.es6
* ***********************************************************************
* Description: the Board module is where all the magic of the game
* happens. This is where the actual Game Board is created and various
* calculation regarding the state of the game are made.  It is our 
* workhorse method. Eventually, we will want to break the Boord Module into 
* further sub modules.
/*---------------------------------------------------------------------*/

class Board {

    /********************************************************************
     * Board.Prototype.constructor defines the func to represent our Class, 
     * our Board class method
     ********************************************************************/

    constructor() {

        const vm = this;

        vm.props = {
            name: "Board",
            el: $("#board"),
            template: boardTpl,
            userAnswers: new Map(),
            output: '',
            difficulty: difficulty
        }

        /**********************************************************
         * Private Variables
         **********************************************************/

        let _board = board;

        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/
        vm.getBoard = () => _board.get('solution');

    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Board.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to or used by classes it is exported to. It will 
     * initalize our Board method so that it can be rendered to the View.
     *********************************************************************/

    initialize() {
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
        return $(vm.el).html(vm.output);
    }

    /*============================ Class Methods ========================*/

    _setListeners() {
        const vm = this;
    }

}


export default Board;
