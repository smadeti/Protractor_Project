"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsconfig_1 = require("../conf/log4jsconfig");
class BasePage {
    constructor() {
        //Open Account page objects
        this.openAccountTab = protractor_1.element(protractor_1.by.buttonText('Open Account'));
        this.OpenCustomerTab = protractor_1.element(protractor_1.by.buttonText('Customers'));
    }
    clickOpenAccountTab() {
        this.openAccountTab.click();
    }
    clickCustomerTab() {
        log4jsconfig_1.log4jsconfig.Log().debug("Navigating to the CustomersTab");
        this.OpenCustomerTab.click();
    }
}
exports.BasePage = BasePage;
