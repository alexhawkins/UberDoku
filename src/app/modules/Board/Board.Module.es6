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

    constructor(props){
        console.log('BOARD', props);
        const vm = this;

        let _PROPS = props;
        vm.el = "#board";
        vm.template = boardTpl;
        vm.output = "";

        vm.getAllGames = () => _STATE.data.allGames.get('all');
        vm.setAllGames = (games) => _STATE.data.allGames.set('all', games);
        vm.getCurrGame = () => _STATE.data.currGame.get('current');
        vm.setCurrGame = (game) => _STATE.data.currGame.set('current', game);
        vm.getStateOf = (property) => _STATE[property];
        vm.setStateOf = (property, val) => _STATE[property] = val;
        vm.getState = () => _STATE;
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
        const vm = this;
        if (!vm.getBoard().length) return;
        vm._setListeners();
        vm.createRows()
        return vm.render();
    }

    /*********************************************************************
     * Board.Prototype.render is a prototype Fn used to render the current
     * state of the Board component to to the View. Note that because it 
     * is a prototype method, rendering can be communicated between any  
     * other modules that Board is exported too 
     *********************************************************************/



    createRows() {
        const vm = this;
        let board = vm.getBoard();
        board.forEach((row, rowId) => vm.createRow(row, rowId));
    }

    createRow(row, rowId) {
        const vm = this;
        vm.output += '<div class="board-container">';
        row.forEach((col, colId) => {
            vm.output += vm.createCell(rowId, colId, col)
        });
        vm.output += '</div>'
        return vm.output;
    }

    createCell(rowId, colId, value) {
        const vm = this;
        let section = '';
        let difficulty = vm.difficulty;
        if (difficulty >= 50) difficulty = difficulty - 30;
        let readOnly = (Math.floor(Math.random() * 100) - 20 > difficulty) ? true : false;
        if ((rowId < 3 || rowId > 5) && (colId < 3 || colId > 5)) section = "new-section";
        else if ((rowId > 2 && rowId < 6) && (colId > 2 && colId < 6)) section = "new-section";
        value = readOnly ? (' value=' + value + ' readonly=true  class="board only-nums ' + section + '"') : ' class="board guess only-nums ' + section + '"';
        return '<input type="text" id="' + rowId + ',' + colId + '"' + value + ' maxlength="1"/>';

    }

    validation(vkeys, userInput) {
        const vm = this;
        let board = vm.getBoard();
        let correctAnwser = board[vkeys[0]][vkeys[1]];
        return (correctAnwser === userInput) ? true : false;
    }

    answerTracker(userInput, isValid) {
        const vm = this;
        return vm.userAnswers.set(userInput, isValid);
    }

    checkAnswers(clear = false, toggle = false) {
        const vm = this;
        let color = '#06060F'
        vm.userAnswers.forEach((key, value) => {
            let indentifier = `${value}`;
            if (clear) vm._clearAnswers(indentifier);
            else if (!toggle) color = key ? 'white' : '#FF0000';
            helpers.colorizeOrClear(indentifier, color, toggle, clear);
        });
    }

    _clearAnswers(identifier) {
        const vm = this;
        return vm.userAnswers.delete(identifier);
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
                vm._evaluateInput(e)
            }, false);
        }
    }

    render() {
        const vm = this;
        return $(vm.el).html(vm.output);
    }

}


export default Board;
