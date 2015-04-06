import "./board.style";
import helpers from "../../utils/helpers";
//import cellTpl from "./cell/cell.module";
/**********************************************************
 * Class Board
 ***********************************************************/

class Board {

    constructor(board, events, difficulty) {
        this.userAnswers = new Map();
        this.output = '';
        this.events = events;
        this.el = $('#board');
        this.difficulty = difficulty;


        /**********************************************************
         * Private Variables
         **********************************************************/

        let _board = board;

        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/
        this.getBoard = () => _board.get('solution');
        this.initialize();
    }

    initialize() {
        if (!this.getBoard().length) return;
        this._setListeners();
        this.createRows()
        return this.render();
    }

    createRows() {
        let board = this.getBoard();
        board.forEach((row, rowId) => this.createRow(row, rowId));
    }

    createRow(row, rowId) {
        this.output += '<div class="board-container">';
        row.forEach((col, colId) =>{
            this.output += this.createCell(rowId, colId, col)});
        this.output += '</div>'
        return this.output;
    }

    createCell(rowId, colId, value) {
        let section = '';
        let difficulty = this.difficulty;
        if (difficulty >= 50) difficulty = difficulty - 30;
        let readOnly = (Math.floor(Math.random() * 100) - 20 > difficulty ) ? true : false;
        if((rowId < 3 || rowId > 5) && (colId < 3 || colId > 5)) section = "new-section";
        else if((rowId > 2 && rowId < 6) && (colId > 2 && colId < 6)) section = "new-section";
        value = readOnly ? (' value=' + value + ' readonly=true  class="board only-nums ' + section + '"') : ' class="board guess only-nums ' + section + '"';
        return '<input type="text" id="' + rowId + ',' + colId + '"' + value + ' maxlength="1"/>';

    }

    validation(vkeys, userInput) {
        let board = this.getBoard();
        let correctAnwser = board[vkeys[0]][vkeys[1]];
        return (correctAnwser === userInput) ? true : false;
    }

    answerTracker(userInput, isValid) {
        return this.userAnswers.set(userInput, isValid);
    }

    checkAnswers(clear = false, toggle = false) {
        let color = '#06060F'
        this.userAnswers.forEach((key, value) => {
            let indentifier = `${value}`;
            if (clear) this._clearAnswers(indentifier);
            else if (!toggle) color = key ? 'white' : '#FF0000';
            helpers.colorizeOrClear(indentifier, color, toggle, clear);
        });
    }

    _clearAnswers(identifier) {
        return this.userAnswers.delete(identifier);
    }

    _evaluateInput(e) {
        let identifier = e.target.id;
        if (isNaN(document.getElementById(identifier).value))
            document.getElementById(identifier).value = '';
        let userInput = e.target.value;
        let correctAnwser = identifier.split(',');
        let validationKeys = correctAnwser.map(e => parseInt(e, 10));
        let isValid = this.validation(validationKeys, parseInt(userInput, 10));
        if (userInput !== '' && !document.getElementById(identifier).readOnly)
            this.answerTracker(identifier, isValid);
    }

    _setListeners() {
        let board = document.getElementById('board');
        if (typeof board.addEventListener !== 'undefined') {
            board.addEventListener('keyup', (e) => {
                this._evaluateInput(e)
            }, false);
        }
    }

    render() {
        return $(this.el).html(this.output);
    }

}

export default Board;
