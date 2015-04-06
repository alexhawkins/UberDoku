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
        
        let answer = {
                isValid: null,
                value: null,
                location: [null, null]
        };
        /* PROPERTIES */
        this.props = props;
        this.props.answers = this.props.stores.answers;

        /* MODULE OPTIONS */
        this.opt = options;
        this.opt.el = "#board";
        this.opt.template = boardTpl;
        this.opt.output = "";

        var _board = _.first(this.props.stores.board);

        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/
        this.getB = () => _board;

    }



    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Board.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to or used by classes it is exported to. It will 
     * initalize our Board method so that it can be rendered to the View.
     *********************************************************************/

    initialize() {
        console.log('board init');
        
        //this._setListeners();
        this.createRows();
        return this.render();
    }

    /*********************************************************************
     * Board.Prototype.render is a prototype Fn used to render the current
     * state of the Board component to to the View. Note that because it 
     * is a prototype method, rendering can be communicated between any  
     * other modules that Board is exported too 
     *********************************************************************/



    createRows() {
        console.log('rows');
        
        let board = [];
        board = this.getB();
        board.forEach((row, rowId) =>
            this.createRow(row, rowId));
    }

    createRow(row, rowId) {
        
        this.opt.output += `<div class="board-container">`;

        row.forEach((col, colId) => {
            this.opt.output += this.createCell(rowId, colId, col);
        });

        this.opt.output += '</div>';
        return this.opt.output;
    }

    createCell(rowId, colId, value) {
        
        let section = '';
        let diff = this.props.difficulty;
        let read = this.opt.readonly;
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
        
        let board, correctAnwser;

        board = this.getB();
        correctAnwser = board[vkeys[0]][vkeys[1]];
        return (correctAnwser === userInput) ? true : false;
    }

    answerTracker(userInput, isValid) {
        
        return this.props.answers.set(userInput, isValid);
    }

    checkAnswers() {
        
        let clear = this.props.clear;
        let toggle = this.props.toggle;

        let color = this.opt.colors.uberBlack;
        this.userAnswers.forEach((key, value) => {
            let identity = `${value}`;
            if (clear) {
                this._clearAnswers(identity);
            } else if (!this.props.toggle) {
                color = key ? 'white' : this.opt.colors.uberRed;
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
        
        return this.props.answers.delete(identifier);
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
                this._evaluateInput(e);
            }, false);
        }
    }

    render() {
        
        console.log('el', this.opt.el);
        console.log('out', this.opt.output);
        return $(this.opt.el).html(this.opt.output);
    }

}


export default Board;
