"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsconfig_1 = require("../conf/log4jsconfig");
// Add customer page objects
var firstName = protractor_1.element(protractor_1.by.model('fName'));
var lastName = protractor_1.element(protractor_1.by.model('lName'));
var postCode = protractor_1.element(protractor_1.by.model('postCd'));
//var addCustBtn = element(by.buttonText('Add Customer'));
var addBtn = protractor_1.element(protractor_1.by.className('btn btn-default'));
//Open Account page objects
var openAccountBtn = protractor_1.element(protractor_1.by.buttonText('Open Account'));
protractor_1.browser.sleep(2000);
var selectCust = protractor_1.element(protractor_1.by.model('custId'));
var selectCurr = protractor_1.element(protractor_1.by.model('currency'));
var processBtn = protractor_1.element(protractor_1.by.buttonText('Process'));
// Customers page objects
var custbtn = protractor_1.element(protractor_1.by.buttonText('Customers'));
var searchCustomer = protractor_1.element(protractor_1.by.model('searchCustomer'));
describe("Enter bank App:", function () {
    beforeEach(function () {
        protractor_1.browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/manager/addCust");
    });
    function verifyAndCloseAlert(txt) {
        let EC = protractor_1.protractor.ExpectedConditions;
        protractor_1.browser.wait(EC.alertIsPresent(), 4000, "Alert Not Found");
        let alert = protractor_1.browser.switchTo().alert();
        let alertText = alert.getText();
        alertText.then(function (txt) {
            log4jsconfig_1.log4jsconfig.Log().debug(txt);
        });
        protractor_1.browser.sleep(2000);
        expect(alertText).toContain(txt);
        alert.accept();
    }
    it('launching Bank App URL: ', function () {
        firstName.sendKeys('Shyam');
        lastName.sendKeys('Shyam');
        postCode.sendKeys(500050);
        addBtn.click();
        verifyAndCloseAlert("Customer added successfully");
    });
    it('Navigating to Open Account page', function () {
        openAccountBtn.click();
        selectCust.$('[value = "3"]').click();
        selectCurr.$('[value = "Pound"]').click();
        processBtn.click();
        protractor_1.browser.sleep(2000);
        verifyAndCloseAlert("Account created successfully");
    });
    it('Verifying datagrid: ', function () {
        custbtn.click();
        //Get rows of the table
        let rows = protractor_1.element.all(protractor_1.by.repeater('cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer'));
        protractor_1.browser.sleep(2000);
        //Using forloop for getting rows and for verifying the text as well as delete text from datatable
        rows.each(function (row) {
            let cells = row.$$('td'); //all(by.css)
            cells.get(0).getText().then(function (txt) {
                if (txt == 'Shyam') {
                    cells.get(4).$('button').click();
                }
            });
        });
        protractor_1.browser.sleep(2000);
    });
});
