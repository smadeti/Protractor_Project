"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
//for importing .json file from test data
//import * as prop from "C:/Users/smadeti/Documents/GITHUB_REPORT/testdata/prop.json";
class CustomerPage {
    constructor() {
        //to get siteURL values from .ts testdata file
        this.prop1 = require("../testdata/prop1");
        // Customers page objects
        this.searchCustomer = protractor_1.element(protractor_1.by.model('searchCustomer'));
        //Get rows of the table
        this.rows = protractor_1.element.all(protractor_1.by.repeater('cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer'));
        //to get values from json file
        //firtname = (<any>prop).customers.firstname;
        //to get siteURL values from .ts testdata file
        this.firtname = this.prop1.customers.firstname;
    }
    VerifyCustEntryAndDelete() {
        //Using forloop for getting rows and for verifying the text as well as delete text from datatable
        let firtname = this.firtname;
        this.rows.each(function (row) {
            let cells = row.$$('td'); //all(by.css)
            cells.get(0).getText().then(function (txt) {
                //if(txt == 'Shyam')
                if (txt == firtname) {
                    cells.get(4).$('button').click();
                }
            });
        });
    }
}
exports.CustomerPage = CustomerPage;
