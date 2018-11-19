const log4jsconfig_1 = require("../conf/log4jsconfig");

var customersPage = function(){

     this.NavigateCustomersBtn = function(){
        element(by.buttonText('Customers')).click();
     };

     this.VerifyCustEntryAndDelete = function(value){
        rows = element.all(by.repeater('cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer'));
        rows.each(function(row){
        let cells = row.$$('td'); //all(by.css)
        cells.get(0).getText().then(function(txt){
        //if(txt == 'Shyam')
        if(txt == value)
        {
            browser.sleep(2000);
            cells.get(4).$('button').click();
            log4jsconfig_1.log4jsconfig.Log().debug("Record Deleted Successfully");
         
            

        }

        })
     })
     }


};

module.exports = new customersPage();