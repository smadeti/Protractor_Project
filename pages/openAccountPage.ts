import { element, browser ,by, protractor } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";
import {alert} from "../util/alert";

export class OpenAccountPage{
 selectCust = element(by.model('custId'));
 selectCurr = element(by.model('currency'));
 processBtn = element(by.buttonText('Process'));

 selectCustomer(){ 
        log4jsconfig.Log().debug("selecting the customer") ; 
        this.selectCust.$('[value = "3"]').click(); 
        
 }

 selectCurrency(){
    log4jsconfig.Log().debug("selecting the Currency") ; 
    this.selectCurr.$('[value = "Pound"]').click();
 }

 clickProcessbutton(){
    this.processBtn.click();
    alert.verifyAndCloseAlert("Account created successfully");
 }




}

