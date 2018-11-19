"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsconfig_1 = require("../conf/log4jsconfig");
const alert_1 = require("../util/alert");
class OpenAccountPage {
    constructor() {
        this.selectCust = protractor_1.element(protractor_1.by.model('custId'));
        this.selectCurr = protractor_1.element(protractor_1.by.model('currency'));
        this.processBtn = protractor_1.element(protractor_1.by.buttonText('Process'));
    }
    selectCustomer() {
        log4jsconfig_1.log4jsconfig.Log().debug("selecting the customer");
        this.selectCust.$('[value = "3"]').click();
    }
    selectCurrency() {
        log4jsconfig_1.log4jsconfig.Log().debug("selecting the Currency");
        this.selectCurr.$('[value = "Pound"]').click();
    }
    clickProcessbutton() {
        this.processBtn.click();
        alert_1.alert.verifyAndCloseAlert("Account created successfully");
    }
}
exports.OpenAccountPage = OpenAccountPage;
