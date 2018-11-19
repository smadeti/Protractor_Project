const alert_1 = require("../util/alert");

describe('Testing BankApp using Page Objects',function(){
       
    beforeEach(function(){
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
       browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/manager/addCust');
    });
 
    var bank_homepage = require('./bank_home_addCustomerPage.js');

    it('Lauching BankPage', function(){
        //Add Customer Home Page
         bank_homepage.enterFirstName('Shyam');
         bank_homepage.getLastName('Prakash');
         bank_homepage.getPostCode('500050');   
         var openAccounts_Page = bank_homepage.clickAddCustomerBtn();
        browser.sleep(3000);
        alert_1.alert.verifyAndCloseAlert("Customer added successfully");

        //Navigating to OpenAccounts page
        openAccounts_Page.NavigateOpenAccountPage();
        openAccounts_Page.selectCustomer(3);
        openAccounts_Page.selectCurrency('Pound');
        var customers_Page = openAccounts_Page.clickProcessBtn();
        browser.sleep(3000);
        alert_1.alert.verifyAndCloseAlert("Account created successfully");

         //Navigating to Customers page
         customers_Page.NavigateCustomersBtn();
         customers_Page.VerifyCustEntryAndDelete('Shyam');
                  
     });

     afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      });
})