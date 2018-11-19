import { element, browser ,by, protractor } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";

// Add customer page objects
var firstName = element(by.model('fName'));
var lastName = element(by.model('lName'));
var postCode = element(by.model('postCd'));
//var addCustBtn = element(by.buttonText('Add Customer'));
var addBtn = element(by.className('btn btn-default'));

//Open Account page objects
var openAccountBtn = element(by.buttonText('Open Account'));
browser.sleep(2000);
var selectCust = element(by.model('custId'));
var selectCurr = element(by.model('currency'));
var processBtn = element(by.buttonText('Process'));

// Customers page objects

var custbtn = element(by.buttonText('Customers'));
var searchCustomer = element(by.model('searchCustomer'));

    
describe("Enter bank App:",function(){
    
    beforeEach(function(){
        browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/manager/addCust");

    });

    function verifyAndCloseAlert(txt: string){

        let EC = protractor.ExpectedConditions;
           browser.wait(EC.alertIsPresent(), 4000 ,"Alert Not Found");
           let alert = browser.switchTo().alert();
           let alertText = alert.getText();
           alertText.then(function(txt){
               log4jsconfig.Log().debug(txt);
           })
           browser.sleep(2000);
           expect(alertText).toContain(txt);
           alert.accept();
    }
    it('launching Bank App URL: ',function(){
       firstName.sendKeys('Shyam');
       lastName.sendKeys('Shyam');
       postCode.sendKeys(500050);
       addBtn.click();
       verifyAndCloseAlert("Customer added successfully");
       
       })

    it('Navigating to Open Account page',function(){

        openAccountBtn.click();
        selectCust.$('[value = "3"]').click();
        selectCurr.$('[value = "Pound"]').click();
        processBtn.click();
        browser.sleep(2000);
        verifyAndCloseAlert("Account created successfully");
    })

    it('Verifying datagrid: ',function(){
        custbtn.click(); 
        //Get rows of the table
        let rows = element.all(by.repeater('cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer'));
        browser.sleep(2000);
        //Using forloop for getting rows and for verifying the text as well as delete text from datatable
        rows.each(function(row: any){
           let cells = row.$$('td'); //all(by.css)
           cells.get(0).getText().then(function(txt: any){
           if(txt == 'Shyam'){
               cells.get(4).$('button').click();

           }

           })
        })

browser.sleep(2000);

    })
    });