"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const alert_1 = require("../util/alert");
//for importing .json file from test data
//import * as prop from "C:/Users/smadeti/Documents/GITHUB_REPORT/testdata/prop.json";
class AddCustomerPage {
    constructor() {
        //to get siteURL values from .ts testdata file
        this.prop1 = require("../testdata/prop1");
        this.firstName = protractor_1.element(protractor_1.by.model('fName'));
        this.lastName = protractor_1.element(protractor_1.by.model('lName'));
        this.postCode = protractor_1.element(protractor_1.by.model('postCd'));
        //var addCustBtn = element(by.buttonText('Add Customer'));
        this.addBtn = protractor_1.element(protractor_1.by.className('btn btn-default'));
        //to get values from json file
        //  firstname = (<any>prop).customers.firstname;
        //  lastname = (<any>prop).customers.lastname;
        //  postalcode = (<any>prop).customers.postalcode;
        //to get siteURL values from .ts testdata file
        this.firstname = this.prop1.customers.firstname;
        this.lastname = this.prop1.customers.lastname;
        this.postalcode = this.prop1.customers.postalcode;
    }
    AddCustomer() {
        // this.firstName.sendKeys('Shyam');
        // this.lastName.sendKeys('Shyam');
        // this.postCode.sendKeys(500050);
        this.firstName.sendKeys(this.firstname);
        this.lastName.sendKeys(this.lastname);
        this.postCode.sendKeys(this.postalcode);
        this.addBtn.click();
        protractor_1.browser.sleep(3000);
        alert_1.alert.verifyAndCloseAlert("Customer added successfully");
    }
}
exports.AddCustomerPage = AddCustomerPage;
