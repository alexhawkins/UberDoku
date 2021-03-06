/************************************************************************
* DataService.es6                                                       *
*************************************************************************
* File: DataService.Module.es6
* ***********************************************************************
* Description: where we store useful utility methods that can be used 
* repeatedly by n different parts of the app. 
/*---------------------------------------------------------------------*/

let dataservice = {

    /*********************************************************************
     * Description: getGames retreives pre-made sedoku game solutions using our 
     * fabricated API. We use a simple Ajax request here to simulate
     * making a request to a real API. This same method is what you would
     * use for making calls to various APIS on the web. It also takes a callback
     * for use when the dataType you are requesting is of JSONP. Simply change
     * the dataType below to JSONP and this will subdue any Cross-Domain
     * issues. This callback will also prove useful when requesting the
     * utility helper from within other modules in the main app.
     *********************************************************************/
    getGames: (callback) => {
        $.ajax({
            url: 'stores/data/games.json',
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: (data) => callback(data),
            error: (err) => console.log(err)
        });
    }
};

export default dataservice;
