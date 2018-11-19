import { element, browser ,by, protractor } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";
import {alert} from "../util/alert";

//for importing .json file from test data
//import * as prop from "C:/Users/smadeti/Documents/GITHUB_REPORT/testdata/prop.json";

export class CustomerPage{

    //to get siteURL values from .ts testdata file
    prop1 = require("../testdata/prop1");

// Customers page objects
 searchCustomer = element(by.model('searchCustomer'));
 //Get rows of the table
 rows = element.all(by.repeater('cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer'));
  //to get values from json file
 //firtname = (<any>prop).customers.firstname;

 //to get siteURL values from .ts testdata file
 firtname = this.prop1.customers.firstname;

 VerifyCustEntryAndDelete(){
      //Using forloop for getting rows and for verifying the text as well as delete text from datatable
      let firtname = this.firtname;
     this.rows.each(function(row: any){
        let cells = row.$$('td'); //all(by.css)
        cells.get(0).getText().then(function(txt: any){
        //if(txt == 'Shyam')
        if(txt == firtname)
        {
            cells.get(4).$('button').click();

        }

        })
     })
}

}