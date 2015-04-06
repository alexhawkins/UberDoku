import "./header.style";
import headerView from "./header.view";

class Header {

    constructor( events, props, difficulty, userAnswers, onUserAdjust ) {
        console.log(arguments);
        this.props = props;
        this.el = '#header';
        this.template = headerView;
        this.events = events;
        this.difficulty = difficulty;
        this.onUserAdjust = onUserAdjust;

    }

    activate() {

        this.render();
        this._setListeners();
    }

    _setListeners() {
        
        $('#difficulty').mouseup(() => {
            let level = $("#difficulty").val();
            if (level !== this.difficulty)
                this.events.emit('adjustDifficulty', level);
        });
    }

    render() {
        console.log('hello');
        return $(this.el).html(this.template);
    }

};

export default Header;
