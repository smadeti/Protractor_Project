"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsconfig_1 = require("../conf/log4jsconfig");
class alert {
    static verifyAndCloseAlert(txt) {
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
}
exports.alert = alert;
