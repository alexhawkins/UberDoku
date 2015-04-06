'use strict';
import './header.style';
import headerView from './header.view';

class Header {

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
        this.el = '#header';
        this.template = headerView;
        this.events = events;
        this.difficulty = props.difficulty;
    }

    /**
     * [initialize description]
     * @return {[type]} [description]
     */
    initialize() {
        this.render();
        this._setListeners();
    }

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        return $(this.el).html(this.template);
    }

    /**
     * [_setListeners description]
     */
    _setListeners() {


        /**
         * [description]
         */
        
        $('#difficulty').mouseup(() => {
            let level = $('#difficulty').val();
            if (level !== this.difficulty) {
                this.events.emit('adjustDifficulty', level);
            }
        });
    }


}

export default Header;
