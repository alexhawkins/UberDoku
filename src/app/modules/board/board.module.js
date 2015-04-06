import "./board.style";
import helpers from "../../utils/helpers";

/**********************************************************
 * Class Board
 ***********************************************************/

class Board {

    constructor(events, props, difficulty, userAnswers) {
         console.log(arguments)
        const vm = this;
        vm.userAnswers = new Map();
        vm.output = '';
        vm.events = events;
        vm.el = $('#board');
        vm.difficulty = difficulty;
        vm.props = props;

        /**********************************************************
         * Private Variables
         **********************************************************/

         let _board =  props.board;

        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/
        vm.getBoard = () => _board;

    }

    activate() {
        const vm = this;
        if (!vm.getBoard().length) return;
        vm._setListeners();
        vm.createRows();
        return vm.render();
    }

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
        let color = 'white'
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
