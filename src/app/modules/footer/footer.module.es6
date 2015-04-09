'use strict';
import './footer.style';
import footerView from './footer.tpl.html';

/**************************************************************************
/** @fileOverview a container for the main controls of the game. 
 * @name    footer.module
 * @class   Footer
 * @templ   footer.view as footerView
 * @style   footer.style
 **************************************************************************/

class Footer {

    /**************************************************************************
     * @constructor 
     * @param    { Object } props The record set's id number.
     * @param    { Object } events      [description]
     * @property { Number } [difficulty]     [description]
     * @property { Array  } [games] [description]
     * @property { Board  } [board] [description]
     * @property { Object } [solution] [description]
     **************************************************************************/

    constructor(events, props) {
        this.difficulty = props.difficulty;
        this.el = '#footer';
        this.template = footerView;
        this.events = events;

        this.checkToggle = false;
    }

    initialize() {
        this.render();
        this.setListeners();
    }

    setListeners() {

        $('#check').click(() => {
            this.events.emit('checkAnswers', this.checkToggle);
            this.events.emit('touchedBoard');
        });

        $('#new-game').click(() => this.events.emit('newGame'));
        $('#clear-board').click(() => this.events.emit('clearBoard'));

        this.events.on('touchedBoard', () => $('#board').keydown(() => {
            this.events.emit('checkAnswers', !this.checkToggle);
        }.bind(this)));
    }

    render() {
        return $(this.el).html(this.template);
    }


}

export default Footer;
