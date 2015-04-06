"use strict";
import "../../assets/stylesheets/base";
/* {  utils  } */
import {
    Promise
}
from 'es6-promise';
//import { defaultProps } from "../../utils/defaultProps.es6";
import Board from "../board/board.module";
import Footer from "../footer/footer.module";
import Header from "../header/header.module";
//import dataservice from "../../utils/DataService";
//import defaultProps from "../../utils/defaultProps";
/**********************************************************
 * Game Class
 ***********************************************************/

class Game {
    constructor(props, events) {

        let _props = props;
        let _state = {
            userAsnswers: [],
            difficulty: 50
        };

        this.virtualDOM = {};

        this.events = events;

        /**********************************************************
         * Getters and Setters for private variables
        /**********************************************************/
        this.getState = () => _state;
        this.getProps = () => _props;

        this.setState = (state) => _.assign(_state, state);
        this.setProps = (props) => _.assign(_props, props);

        this.activate();
    }

    activate() {
        this._setListeners();
        this.instantiate();
        this.render();
    }

    handleChange(id, userAnswers, difficulty) {
        this.setState({
            userAnswers: userAnswers,
            difficulty: difficulty
        });
        this.events.emit(id);
    }

    // newGame() {
    //     const this = this;
    //     let all = this.getAllBoards().get('all');
    //     return all.length > 0 ? this.setBoardData(all) : this.requestGameData();
    // }

    instantiate() {
        let events = this.events;
        let props = this.getProps();
        let difficulty = this.getState().difficulty;
        let userAnswers = this.getState().userAnswers;
        let onUserAdjust = this.handleChange;
        let onUserButtonClick = this.handleChange;

        this.header = new Header(
            events,
            props,
            difficulty,
            userAnswers,
            onUserAdjust
        );

        this.board = new Board(
            events,
            props,
            difficulty,
            userAnswers
        );

        this.footer = new Footer(
            events,
            props,
            difficulty,
            userAnswers,
            onUserButtonClick
        );
    }

    render() {

        let promise = new Promise((resolve) => {
            resolve(true);
        });

        return promise
            .then(() => this.board.activate())
            .catch((err) => $log(err))
            .then(() => this.header.activate())
            .catch((err) => $log(err))
            .then(() => this.footer.activate())
            .catch((err) => $log(err))
            .then(() => this.events.emit('loaded'));
    }


    _setListeners() {
        console.log('loaded');
        this.events.on('checkAnswers', (args) => {
            let board = this.getProps().board;
            board.checkAnswers(false, args);
        });

        this.events.on('clearBoard', () => {
            let board = this.getProps().board;
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
            let board = this.getProps().board;
            console.log(board);
            this.difficulty = args;
            board.difficulty = args;
            board.output = '';
            this.board.createRows(args);
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
