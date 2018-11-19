import { element, browser ,by, protractor } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";
import {alert} from "../util/alert";
 //for importing .json file from test data
//import * as prop from "C:/Users/smadeti/Documents/GITHUB_REPORT/testdata/prop.json";


export class AddCustomerPage{
    //to get siteURL values from .ts testdata file
     prop1 = require("../testdata/prop1");

     firstName = element(by.model('fName'));
     lastName = element(by.model('lName'));
     postCode = element(by.model('postCd'));
    //var addCustBtn = element(by.buttonText('Add Customer'));
     addBtn = element(by.className('btn btn-default'));

      //to get values from json file

    //  firstname = (<any>prop).customers.firstname;
    //  lastname = (<any>prop).customers.lastname;
    //  postalcode = (<any>prop).customers.postalcode;

    //to get siteURL values from .ts testdata file
    firstname = this.prop1.customers.firstname;
    lastname = this.prop1.customers.lastname;
    postalcode = this.prop1.customers.postalcode;

     AddCustomer(){
        // this.firstName.sendKeys('Shyam');
        // this.lastName.sendKeys('Shyam');
        // this.postCode.sendKeys(500050);
        this.firstName.sendKeys(this.firstname);
        this.lastName.sendKeys(this.lastname);
        this.postCode.sendKeys(this.postalcode);

        this.addBtn.click();
        browser.sleep(3000);
        alert.verifyAndCloseAlert("Customer added successfully");
     }

    
}

