import { element, browser ,by, protractor } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";
import { AddCustomerPage } from "../pages/addCustomer";
import { BasePage } from "../pages/BasePage";
import { OpenAccountPage } from "../pages/openAccountPage";
import { CustomerPage } from "../pages/customersPage";
import {alert} from "../util/alert";
import * as prop from "C:/Users/smadeti/Documents/GITHUB_REPORT/testdata/prop.json";
   
describe("Enter bank App:",function(){

     //to get siteURL values from .ts testdata file
    let prop1 = require("../testdata/prop1");
    
    beforeEach(function(){

        // If we want to test in non angular application using protractor, we have to use the belowline:
        //browser.ignoreSynchronization = true; or
        //(global as any).isAngularSite(false);


        //hardcoded values
        //browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/manager/addCust");

        //to get siteURL values from json file
        //browser.get((<any>prop).siteURL);

        //to get siteURL values from .ts testdata file
        browser.get(prop1.siteURL);

    });

    
    it("launching Bank App URL: ",function(){
       log4jsconfig.Log().debug("Navigating to AddCustomersTab");
       let addCustomerPage = new AddCustomerPage();

       addCustomerPage.AddCustomer();
       browser.sleep(3000);
       log4jsconfig.Log().debug("Navigating to OpenAccountTab");
       new BasePage().clickOpenAccountTab();

       let openAccountPage = new OpenAccountPage(); 
       openAccountPage.selectCustomer();
       openAccountPage.selectCurrency();
       browser.sleep(2000);
       openAccountPage.clickProcessbutton();
       browser.sleep(2000);

       new BasePage().clickCustomerTab();
       browser.sleep(5000);
       log4jsconfig.Log().debug("Verifying Customer Entry and Delete") ; 
       new CustomerPage().VerifyCustEntryAndDelete();
       browser.sleep(2000);

       
    })
    });