import "../../assets/stylesheets/base";
/* {  utils  } */
import {
    Promise
}
from 'es6-promise';

import Board from "../board/board.module";
import dataservice from "../../utils/DataService";
/**********************************************************
 * Game Class
 ***********************************************************/

class Game {
    constructor(events, difficulty) {


        this.events = events;
        this.score = 0;
        this.time = 0;
        this.difficulty = difficulty;

        /**********************************************************
         * Private Variables
         **********************************************************/

        let _allBoards = new Map();
        let _solution = new Map();
        let _gameBoard = new Map();
        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/

        this.setAllBoards = (l) => _allBoards.set('all', l);
        this.getAllBoards = () => _allBoards;
        this.setSolution = (o) => _solution.set('solution', o);
        this.getSolution = () => _solution;
        this.setGameBoard = (l) => _gameBoard.set('solution', l);
        this.getGameBoard = () => _gameBoard;
    }

    initialize(data) {
        this.difficulty = 50;
        this.setBoardData(data);
        this._setListeners();
    }

    requestGameData() {
        return dataservice.getGames(this.setBoardData.bind(this));
    }

    setBoardData(data) {
        let promise = new Promise((resolve) => {
            let allBoards = _.map(data, e => e);
            this.setAllBoards(allBoards);
            resolve(allBoards)
        });

        promise
            .then((boards) => this.createSolutionBoard(boards))
            .catch((doh) => console.log(doh))
            .then((solution) => this.createGameBoard(solution))
            .catch((doh) => console.log(doh))
            .then((gameB) => this.setGameBoard(gameB))
            .catch((doh) => console.log(doh));
    }

    createSolutionBoard(all) {
        let solution = all.shift();
        this.setSolution(solution);
        return this.getSolution();
    }

    createGameBoard(solution) {
        let gameBoard = new Board(solution, this.events, this.difficulty); //create new instance of Board
        //iniitalize game board
        return gameBoard;
    }

    newGame() {
        let all = this.getAllBoards().get('all');
        return all.length > 0 ? this.setBoardData(all) : this.requestGameData();
    }

    _setListeners() {

        this.events.on('checkAnswers', (args) => {
            this.getGameBoard()
                .get('solution')
                .checkAnswers(false, args);
        });

        this.events.on('clearBoard', () => {
            let board = this.getGameBoard().get('solution');
            board.checkAnswers(true);
            board.userAnswers.clear;
        });

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

        this.events.on('adjustDifficulty', (args) => {
            let board = this.getGameBoard().get('solution')
            this.difficulty = args;
            board.difficulty = args;
            board.output = '';
            board.createRows(args);
            $('#board').html(board.output);
            board.checkAnswers(true);
            board.userAnswers.clear;
        });

        this.events.on('newGame', () => {
            $.when(
                $('#board').animate({
                    opacity: 0
                }, 500).promise()
            ).done(() => {
                this.newGame();
                $('#board').animate({
                    opacity: 1
                }, 500).promise()
            });
        });
    }
}


export default Game;
