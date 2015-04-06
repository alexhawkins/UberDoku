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
    constructor(events, props) {

        this.events = events;
        this.difficulty = props.difficulty;

        /**********************************************************
         * Private Variables
         **********************************************************/

        let _allGames = props.games;
        let _solution = new Map();
        let _gameBoard = props.board;
        /**********************************************************
         * Getters and Setters for private variables
         **********************************************************/

        this.setAllGames = (l) => _allGames.set('all', l);
        this.getAllGames = () => _allGames;
        this.setSolution = (o) => _solution.set('solution', o);
        this.getSolution = () => _solution;
        this.setGameBoard = (l) => _gameBoard.set('solution', l);
        this.getGameBoard = () => _gameBoard;
    }

    initialize(data) {
        this.setBoardData(data);
        this._setListeners();
    }

    requestGameData() {
        return dataservice.getGames(this.setBoardData.bind(this));
    }

    setBoardData(data) {
        let promise = new Promise((resolve) => {
            let games = _.map(data, e => e);
            this.setAllGames(games);
            resolve(games);
        });

        promise
            .then((games) => this.createSolutionBoard(games))
            .catch((doh) => console.log(doh))
            .then((solution) => this.render(solution))
            .catch((doh) => console.log(doh))
            .then((board) => this.setGameBoard(board))
            .catch((doh) => console.log(doh));
    }

    createSolutionBoard(all) {
        let solution = all.shift();
        this.setSolution(solution);
        return this.getSolution();
    }

    newGame() {
        let all = this.getAllGames().get('all');
        return all.length > 0 ? this.setBoardData(all) : this.requestGameData();
    }

    render(solution) {
        return new Board(
            solution,
            this.events,
            this.difficulty
        );
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
            let board = this.getGameBoard().get('solution');
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
                }, 500).promise();
            });
        });
    }
}


export default Game;
