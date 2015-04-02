/********* Uberdoku defined modules & assets ***************************/
import "./Footer.Style.scss";
import footerTpl from "./Footer.Template";

/************************************************************************
* Footer Class                                                          *
*************************************************************************
* File: Footer.Module.es6
* ***********************************************************************
* Description: the Footer module is repsonsible for the main contorl
* components of our app. Such as starting, checking and refreshing a game
/*---------------------------------------------------------------------*/

class Footer {

    /********************************************************************
     * Footer.Prototype.constructor defines the func to represent our Class, 
     * our Footer class method
     ********************************************************************/

    constructor(difficulty = 50) {
        const vm = this;
        vm.props = {
            name: "Footer",
            difficulty: difficulty,
            el = "#footer",
            template = footerTpl
        }

    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Footer.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to. classes it extends to or used by classes it 
     * is exported to. It will initalize our footer method so that it can
     * be rendered to the View.
     *********************************************************************/


    initialize() {
        const vm = this;
        vm.render();
        vm.setListeners();
    }

    /*********************************************************************
     * Footer.Prototype.render is a prototype Fn used to render the current
     * state of our Footer component to to the View. Note that because it 
     * is a prototype method, rendering can be communicated between any  
     * other modules that Footer is exported too 
     *********************************************************************/

    render() {
        const vm = this;
        return $(vm.props.el).html(vm.props.template);
    }

    /*============================ Class Methods ========================*/

    setListeners() {
        const vm = this;
    }

}


export default Footer;
