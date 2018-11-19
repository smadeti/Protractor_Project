require('./bank_CustomersPage');

var openAccount_page = function(){

    this.NavigateOpenAccountPage = function(){
        element(by.buttonText('Open Account')).click();
    }

    this.selectCustomer = function(index){
        element(by.model('custId')).$('[value="'+ index +'"]').click(); 
    };

    this.selectCurrency = function(index) {
        element(by.model('currency')).$('[value="'+ index +'"]').click();
    };

    this.clickProcessBtn = function(){
        element(by.buttonText('Process')).click();
        return require('./bank_CustomersPage')
        
    };
};

module.exports = new openAccount_page();