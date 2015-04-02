/********* Uberdoku defined modules & assets ***************************/
import "./Header.Style.scss";
import headerTpl from "./Header.Template";

/************************************************************************
* Header Class                                                          *
*************************************************************************
* File: Header.Module.es6
* ***********************************************************************
* Description: the Header module is where navigation and other
* game control elements reside.   
/*---------------------------------------------------------------------*/

class Header {

    /********************************************************************
     * Header.Prototype.constructor defines the func to represent our
     * Class, our Header class method
     ********************************************************************/

    constructor(props) {
        console.log(props);
        let _PROPS = props;
        const vm = this;
        vm.el = "#header",
        vm.template = headerTpl

    }

    /*======================== Prototype Methods =======================*/

    /*********************************************************************
     * Header.Prototype.intialize is a prototype Fn & can be inherited by 
     * classes it extends to or used by classes it is exported to. It will 
     * initalize our header method so that it can be rendered to the View.
     *********************************************************************/

    initialize() {
        console.log('hello');
        const vm = this;
    }

    /*********************************************************************
     * Header.Prototype.render is a prototype Fn used to render the current
     * state of the Header component to to the View. Note that because it 
     * is a prototype method, rendering can be communicated between any  
     * other modules that Header is exported too 
     *********************************************************************/

    render() {
        console.log('header rendered');
        const vm = this;
        return $(vm.props.el).html(vm.props.template);
    }

    /*============================ Class Methods ========================*/

    _setListeners() {
        const vm = this;
    }

}


export default Header;
