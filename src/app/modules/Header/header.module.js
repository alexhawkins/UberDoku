'use strict';
import "./header.style";
import headerView from "./header.view";

class Header {

    constructor(events,  props) {
        this.el = '#header';
        this.template = headerView;
        this.events = events;
        this.difficulty = props.difficulty;
    }

    initialize() {
        this.render();
        this._setListeners();
    }

   
    render() {
        return $(this.el).html(this.template);
    }

     _setListeners() {

        $('#difficulty').mouseup(() => {
            console.log('up');
            let level = $("#difficulty").val();
            if(level !== this.difficulty)
                this.events.emit('adjustDifficulty', level);
        });
    }


}

export default Header;
