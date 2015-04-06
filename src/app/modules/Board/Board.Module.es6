/********* Uberdoku defined modules & assets ***************************/
"use strict";
//import "./Board.Style.scss";
import helpers from "/../../utils/helpers.es6";
import boardTpl from "./Board.Template";

/************************************************************************
 * Class: Board                                                          *
 * File: Board.Module.es6                                                 *
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

    constructor(props, options) {
        console.log(props);
        const vm = this;
        let answer = {
                isValid: null,
                value: null,
                location: [null, null]
        };
        /* PROPERTIES */
        vm.props = props;
        vm.props.answers = vm.props.stores.answers;

        /* MODULE OPTIONS */
        vm.opt = options;
        vm.opt.el = "#board";
        vm.opt.template = boardTpl;
        vm.opt.output = "";

        var _board = _.first(vm.props.stores.board);

        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/
        vm.getB = () => _board;

    }



    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Board.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to or used by classes it is exported to. It will 
     * initalize our Board method so that it can be rendered to the View.
     *********************************************************************/

    initialize() {
        console.log('board init');
        const vm = this;
        //vm._setListeners();
        vm.createRows();
        return vm.render();
    }

    /*********************************************************************
     * Board.Prototype.render is a prototype Fn used to render the current
     * state of the Board component to to the View. Note that because it 
     * is a prototype method, rendering can be communicated between any  
     * other modules that Board is exported too 
     *********************************************************************/



    createRows() {
        console.log('rows');
        const vm = this;
        let board = [];
        board = vm.getB();
        board.forEach((row, rowId) =>
            vm.createRow(row, rowId));
    }

    createRow(row, rowId) {
        const vm = this;
        vm.opt.output += `<div class="board-container">`;

        row.forEach((col, colId) => {
            vm.opt.output += vm.createCell(rowId, colId, col);
        });

        vm.opt.output += '</div>';
        return vm.opt.output;
    }

    createCell(rowId, colId, value) {
        const vm = this;
        let section = '';
        let diff = vm.props.difficulty;
        let read = vm.opt.readonly;
        if (diff >= 50) diff = diff - 30;
        read = (Math.floor(Math.random() * 100) - 20 > diff) ? true : false;
        if ((rowId < 3 || rowId > 5) && (colId < 3 || colId > 5))
            section = "new-section";
        else if ((rowId > 2 && rowId < 6) && (colId > 2 && colId < 6))
            section = "new-section";
        value = read ? (' value=' + value + ' readonly=true  class="board only-nums ' + section + '"') : ' class="board guess only-nums ' + section + '"';
        return '<input type="text" id="' + rowId + ',' + colId + '"' + value + ' maxlength="1"/>';

    }

    validation(vkeys, userInput) {
        const vm = this;
        let board, correctAnwser;

        board = vm.getB();
        correctAnwser = board[vkeys[0]][vkeys[1]];
        return (correctAnwser === userInput) ? true : false;
    }

    answerTracker(userInput, isValid) {
        const vm = this;
        return vm.props.answers.set(userInput, isValid);
    }

    checkAnswers() {
        const vm = this;
        let clear = vm.props.clear;
        let toggle = vm.props.toggle;

        let color = this.opt.colors.uberBlack;
        vm.userAnswers.forEach((key, value) => {
            let identity = `${value}`;
            if (clear) {
                vm._clearAnswers(identity);
            } else if (!vm.props.toggle) {
                color = key ? 'white' : vm.opt.colors.uberRed;
            }
            console.log(identity);
            helpers.colorizeOrClear(identity, color, clear, toggle);
        });
    }


    colorizeOrClear(identity, color, clear, toggle) {
        let element = document.getElementById(identity);
        element.style.backgroundColor = color;
        element.style.weight = 'bold';
        element.style.color = color === 'white' ? '#070713' : 'white';
        if (clear) element.value = '';
    }

    _clearAnswers(identifier) {
        const vm = this;
        return vm.props.answers.delete(identifier);
    }

    _evaluateInput(e) {
        const vm = this;
        let identifier = e.target.id;
        if (isNaN(document.getElementById(identifier).value))
            document.getElementById(identifier).value = '';
        let userInput = e.target.value;
        let correctAnwser = identifier.split(',');
        let validationKeys = correctAnwser.map(e => parseInt(e, 10));
        let isValid = vm.validation(validationKeys, parseInt(userInput, 10));
        if (userInput !== '' && !document.getElementById(identifier).readOnly)
            vm.answerTracker(identifier, isValid);
    }

    _setListeners() {
        const vm = this;
        let board = document.getElementById('board');
        if (typeof board.addEventListener !== 'undefined') {
            board.addEventListener('keyup', (e) => {
                vm._evaluateInput(e);
            }, false);
        }
    }

    render() {
        const vm = this;
        console.log('el', vm.opt.el);
        console.log('out', vm.opt.output);
        return $(vm.opt.el).html(vm.opt.output);
    }

}


export default Board;
