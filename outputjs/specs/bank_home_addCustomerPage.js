require('./bank_openAccountPage');

var bank_home_addCustomerPage = function(){

         
        this.enterFirstName = function(value){
            element(by.model('fName')).sendKeys(value);
        };

        this.getFirstNameText = function(){
            return element(by.model('fName')).getText();
        }

        this.getLastName =  function(value){
            element(by.model('lName')).sendKeys(value);

        };

        this.getPostCode=  function(value){
            element(by.model('postCd')).sendKeys(value);

        };

        this.clickAddCustomerBtn =  function(){
            element(by.className('btn btn-default')).click();
            return require('./bank_openAccountPage');
            
        };    

        
};

module.exports = new bank_home_addCustomerPage();