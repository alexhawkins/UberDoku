import "./header.style";
import headerView from "./header.view";

class Header {

    constructor(events, difficulty, props) {
        let getProps = props.get('props');
        props.set('props');
        this.el = '#header';
        this.template = headerView;
        this.events = events;
        this.difficulty = difficulty;
        console.log(getProps.name);
    }

    initialize() {
        this.render();
        this._setListeners();
    }

    _setListeners() {

        $('#difficulty').mouseup(() => {
            console.log('up');
            let level = $("#difficulty").val();
            if(level !== this.difficulty)
                this.events.emit('adjustDifficulty', level);
        });
    }

    render() {
        return $(this.el).html(this.template);
    }

};

export default Header;
