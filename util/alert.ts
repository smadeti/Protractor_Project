import {protractor,browser} from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig"

export class alert{
static verifyAndCloseAlert(txt: string){

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
}