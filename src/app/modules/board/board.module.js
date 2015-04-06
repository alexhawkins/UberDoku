'use strict';
import './board.style';


/************************************************************************
 * Class: Board                                                         *
 * File: Board.Module.es6                                               *
 * ======================================================================
 * Description: the Board module is where all the magic of the game
 * happens. This is where the actual Game Board is created and various
 * calculation regarding the state of the game are made. It is our 
 * workhorse method. Eventually, we will want to break the Board Module 
 * into further sub components/modules.
 ************************************************************************/

class Board {

    /**************************************************************************
     * @class   { Board } 
     * Board Class contrstructor function
     * 
     * @param   { Array } board      [description]
     * @param   { Object} events     [description]
     * @param   { Integer }  difficulty [description]
     * @config  { Object } [ userAnswers ]  [description]
     * 
     **************************************************************************/

    constructor(board, events, difficulty) {
        this.userAnswers = new Map();
        this.output = '';
        this.events = events;
        this.el = '#board';
        this.difficulty = difficulty;


        let _board = board;

         /** [description] */
        this.getBoard = () => _board.get('solution');
        this.initialize();
    }
    /**************************************************************************
     * [initialize description]
     * @return {[type]} [description]
     *************************************************************************/ 

    initialize() {
        this._setListeners();
        this.createRows();
        return this.render();
    }
    /**************************************************************************
     * [createRows description]
     * @return {[type]} [description]
     *************************************************************************/
    
    createRows() {
        let board = this.getBoard();
        board.forEach((row, rowId) => this.createRow(row, rowId));
    }

    /**************************************************************************
     * [createRow description]
     * @param  {[type]} row   [description]
     * @param  {[type]} rowId [description]
     * @return {[type]}       [description]
     **************************************************************************/
    createRow(row, rowId) {
        this.output += '<div class="board-container">';
        row.forEach((col, colId) => {
            this.output += this.createCell(rowId, colId, col);
        });
        this.output += '</div>';
        return this.output;
    }

    /**************************************************************************
     * [createCell description]
     * @param  {[type]} rowId [description]
     * @param  {[type]} colId [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     **************************************************************************/

    createCell(rowId, colId, value) {

        let section = '';
        let difficulty = this.difficulty;

        if  (difficulty >= 50) { 
            difficulty = difficulty - 30;
        }
        let throttle = (Math.floor(Math.random() * 100) - 20);
        let readOnly = (throttle > difficulty) ? true : false;

        if  ((rowId < 3 || rowId > 5) && (colId < 3 || colId > 5)){
            section = 'new-section';
        } 
            
        else if ((rowId > 2 && rowId < 6) && (colId > 2 && colId < 6)) {
                section = 'new-section';
        }
        if(readOnly){
            value = ' value=' + value + 
                    ' readonly=true  class="board only-nums ' + 
                    section + '"';
        } else {
            value = ' class="board guess only-nums ' + section + '"';
        } 
        return  '<input type="text" id="cell-' + 
                    rowId + '-' +
                    colId + '"' +
                    value + ' ' + 
                'maxlength="1"/>';

    }

    /**************************************************************************
     * [validation description]
     * @param  {[type]} vkeys     [description]
     * @param  {[type]} userInput [description]
     * @return {[type]}           [description]
     **************************************************************************/

    validation(vkeys, userInput) {
        let board = this.getBoard();
        let correctAnwser = board[vkeys[0]][vkeys[1]];
        return (correctAnwser === userInput) ? true : false;
    }

    /**************************************************************************
     * [answerTracker description]
     * @param  {[type]}  userInput [description]
     * @param  {Boolean} isValid   [description]
     * @return {[type]}            [description]
     **************************************************************************/
    
    answerTracker(userInput, isValid) {
        return this.userAnswers.set(userInput, isValid);
    }

    /**************************************************************************
     * [checkAnswers description]
     * @param  {Boolean} clear  [description]
     * @param  {Boolean} toggle [description]
     * @return {[type]}         [description]
     **************************************************************************/
    
    checkAnswers(clear = false, toggle = false) {

        this.userAnswers.forEach((key, value) => {
            let el = document.getElementById(value);
            let color = 'white';
            if (clear) { 
                this._clearAnswers(value);
            }
            /* if not attempting to clear the board or 
            and not on keydown after checking answers, set new cell color */
            else if (!toggle) {
                color = key ? '#00E031' : '#FF1800';
            }
            this._colorizeOrClear(el, color, toggle, clear);
        });
    }

    /**************************************************************************
     * [_colorizeOrClear description]
     * @param  {[type]}  el     [description]
     * @param  {[type]}  color  [description]
     * @param  {[type]}  toggle [description]
     * @param  {Boolean} clear  [description]
     * @return {[type]}         [description]
     **************************************************************************/
    
    _colorizeOrClear(el, color, toggle, clear = false) {
        el.style.color = color;
        el.style.weight = 900;
        if (clear) {
            el.value = '';
        }
    }

    /**************************************************************************
     * [_clearAnswers description]
     * @param  {[type]} identifier [description]
     * @return {[type]}            [description]
     **************************************************************************/
    
    _clearAnswers(identifier) {
        return this.userAnswers.delete(identifier);
    }

    /**************************************************************************
     * [_evaluateInput description]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     **************************************************************************/
    
    _evaluateInput(e) {

        let identifier = e.target.id;

        if (isNaN(document.getElementById(identifier)
            .value)){
            document.getElementById(identifier)
            .value = '';
        }

        let userInput = e.target.value;

        let correctAnwser = _.rest(
            identifier.split('-'));

        let validationKeys = correctAnwser.map(
            e => parseInt(e, 10));

        let isValid = this.validation(
            validationKeys, 
            parseInt(userInput,
            10
        ));

        if (userInput !== '' && !document.getElementById(identifier)
            .readOnly){
            this.answerTracker(identifier, isValid);
        }
    }

    /**************************************************************************
     * [_setListeners description]
     **************************************************************************/

    _setListeners() {
        let board = document.getElementById('board');
        if (typeof board.addEventListener !== 'undefined') {
            board.addEventListener('keyup', (e) => {
                this._evaluateInput(e);
            }, false);
        }
    }

    /**************************************************************************
     * [render description]
     * @return {[type]} [description]
     **************************************************************************/

    render() {
        return $(this.el)
            .html(this.output);
    }

}

export default Board;