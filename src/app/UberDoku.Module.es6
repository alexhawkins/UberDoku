/* {  assets  } */
import "./assets/stylesheets/base";

/* {  utils  } */
import { Promise } from 'es6-promise';

/* {  modules  } */
import Game        from "./modules/Game/Game.Module";
import Footer      from "./modules/Footer/Footer.module";
import Header      from "./modules/Header/Header.module";

/**********************************************************
 * UberDoku Class
 ***********************************************************/

class UberDoku {

    constructor() {

        const vm = this;
        vm.name  = 'UberDoku';

        /**********************************************************
         * instantiate component Classes for UberDoku
         **********************************************************/

        vm.Header = new Header( vm.Events );
        vm.Game   = new Game(   vm.Events );
        vm.Footer = new Footer( vm.Events );

    }

    initialize() {
        const vm = this;
    }
}

/*load game when ready*/
$(document).ready(function(){
    let uberDoku = new UberDoku();
    /* initialize components for Sedoku */
    uberDoku.initialize( );
});


export default UberDoku;
