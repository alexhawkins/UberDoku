'use strict';
import '../../assets/stylesheets/base';
import { Promise }  from 'es6-promise';

import Board        from '../board/board.module';


/**
 * @class Game
 * 
 */
class Game {

    /**************************************************************************
     * @constructor 
     * @param    { Object } props The record set's id number.
     * @param    { Object } events      [description]
     * @property { Number } [difficulty]     [description]
     * @property { Array  } [games] [description]
     * @property { Board  } [board] [description]
     * @property { Object } [solution] [description]
     **************************************************************************/

    constructor(getMoreGames, events, props) {
        this.getMoreGames = getMoreGames;
        this.events = events;
        this.difficulty = props.difficulty;

        /**********************************************************
         * Private Variables
         **********************************************************/

        let _allGames = props.games;
        let _solution = new Map();
        let _gameBoard = props.board;

        /**********************************************************************
         * Getter and Setter Methods functions for privates variables
         * @param   { Array } board      [description]
         * @param   { Object} events     [description]
         * @param   { Integer }  difficulty [description]
         * @config  { Object } [ userAnswers ]  [description]
         **********************************************************************/

        this.setAllGames = (l) => _allGames.set('all', l);
        this.getAllGames = () => _allGames;
        this.setSolution = (o) => _solution.set('solution', o);
        this.getSolution = () => _solution;
        this.setGameBoard = (l) => _gameBoard.set('solution', l);
        this.getGameBoard = () => _gameBoard;
    }

    /**
     * [initialize description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    
    initialize(data) {
        this.setBoardData(data);
        this._setListeners();
    }

    /**
     * [requestGameData description]
     * @return {[type]} [description]
     */
    
    requestGameData() {
        return this.getMoreGames(this.setBoardData.bind(this));
    }

    /**
     * [setBoardData description]
     * @param {[type]} data [description]
     */
    
    setBoardData(data) {
        this.setAllGames(data);
        return this.createSolutionBoard();
    }

    /**
     * [createSolutionBoard description]
     * @param  {[type]} all [description]
     * @return {[type]}     [description]
     */
    
    createSolutionBoard( ) {
        let allBoards = this.getAllGames().get('all');
        let promise = new Promise((resolve) => {
            resolve(allBoards);
        });

        promise
            .then((allBoards) => allBoards.shift())
            .catch((doh) => console.log(doh))
            .then((solution) => this.setSolution(solution))
            .catch((doh) => console.log(doh))
            .then((solution) => this.getSolution())
            .catch((doh) => console.log(doh))
            .then((solution) => this.render(solution))
            .catch((doh) => console.log(doh))
            .then((board) => this.setGameBoard(board))
            .catch((doh) => console.log(doh));
    }

    /**
     * [newGame description]
     * @return {[type]} [description]
     */
    
    newGame() {
        let all = this.getAllGames().get('all');
        return all.length > 0 ? this.createSolutionBoard() : this.requestGameData();
    }

    /**
     * [render description]
     * @param  {[type]} solution [description]
     * @return {[type]}          [description]
     */
    
    render(solution) {
        return new Board(
            solution,
            this.events,
            this.difficulty
        );
    }

    /**
     * [_setListeners description]
     */
    
    _setListeners() {

        /**
         * [description]
         * @param  {[type]} 'checkAnswers' [description]
         * @param  {[type]} (args          [description]
         * @return {[type]}                [description]
         */
        this.events.on('checkAnswers', (args) => {
            this.getGameBoard()
                .get('solution')
                .checkAnswers(false, args);
        });

    
        /**
         * [description]
         * @param  {[type]} 'clearBoard' [description]
         * @param  {[type]} (            [description]
         * @return {[type]}              [description]
         */
        this.events.on('clearBoard', () => {
            let board = this.getGameBoard().get('solution');
            board.checkAnswers(true);
            board.userAnswers.clear;
        });

        /**
         * [description]
         * @param  {[type]} 'loaded' [description]
         * @param  {[type]} (        [description]
         * @return {[type]}          [description]
         */
        
        this.events.on('loaded', () => {
            $('#header').animate({
                opacity: 1
            }, 500);
            $('#board').animate({
                opacity: 1
            }, 500);
            $('#footer').animate({
                opacity: 1
            }, 500);
        });

        /**
         * [description]
         * @param  {[type]} 'adjustDifficulty' [description]
         * @param  {[type]} (args              [description]
         * @return {[type]}                    [description]
         */
        
        this.events.on('adjustDifficulty', (args) => {
            let board = this.getGameBoard().get('solution');
            this.difficulty = args;
            board.difficulty = args;
            board.output = '';
            board.createRows(args);
            $('#board').html(board.output);
            board.checkAnswers(true);
            board.userAnswers.clear;
        });

        /**
         * [description]
         * @param  {[type]} 'newGame'      [description]
         */
        
        this.events.on('newGame', () => {
            $.when(
                $('#board').animate({
                    opacity: 0
                }, 500).promise()
            ).done(() => {
                this.newGame();
                $('#board').animate({
                    opacity: 1
                }, 500).promise();
            });
        });
    }
}


export default Game;
