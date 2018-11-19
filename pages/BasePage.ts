import { element, browser ,by, protractor } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";
import {alert} from "../util/alert";


export class BasePage{
    //Open Account page objects
 openAccountTab = element(by.buttonText('Open Account'));
 OpenCustomerTab = element(by.buttonText('Customers'));
 
    clickOpenAccountTab(){
        this.openAccountTab.click();
            }
    clickCustomerTab(){
                log4jsconfig.Log().debug("Navigating to the CustomersTab") ; 
                this.OpenCustomerTab.click();
                    }


}

