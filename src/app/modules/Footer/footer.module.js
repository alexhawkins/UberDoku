import "./footer.style";
import footerView from "./footer.view.html";

class Footer {

    constructor(getMoreData, events, props) {
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

        this.events.on('touchedBoard', ( ) => $('#board').keydown(() => {
            this.events.emit('checkAnswers', !this.checkToggle);
        }.bind(this)));
    }

    render() {
        return $(this.el).html(this.template);
    }


}

export default Footer;
