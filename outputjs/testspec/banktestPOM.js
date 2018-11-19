"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsconfig_1 = require("../conf/log4jsconfig");
const addCustomer_1 = require("../pages/addCustomer");
const BasePage_1 = require("../pages/BasePage");
const openAccountPage_1 = require("../pages/openAccountPage");
const customersPage_1 = require("../pages/customersPage");
describe("Enter bank App:", function () {
    //to get siteURL values from .ts testdata file
    let prop1 = require("../testdata/prop1");
    beforeEach(function () {
        // If we want to test in non angular application using protractor, we have to use the belowline:
        //browser.ignoreSynchronization = true; or
        //(global as any).isAngularSite(false);
        //hardcoded values
        //browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/manager/addCust");
        //to get siteURL values from json file
        //browser.get((<any>prop).siteURL);
        //to get siteURL values from .ts testdata file
        protractor_1.browser.get(prop1.siteURL);
    });
    it("launching Bank App URL: ", function () {
        log4jsconfig_1.log4jsconfig.Log().debug("Navigating to AddCustomersTab");
        let addCustomerPage = new addCustomer_1.AddCustomerPage();
        addCustomerPage.AddCustomer();
        protractor_1.browser.sleep(3000);
        log4jsconfig_1.log4jsconfig.Log().debug("Navigating to OpenAccountTab");
        new BasePage_1.BasePage().clickOpenAccountTab();
        let openAccountPage = new openAccountPage_1.OpenAccountPage();
        openAccountPage.selectCustomer();
        openAccountPage.selectCurrency();
        protractor_1.browser.sleep(2000);
        openAccountPage.clickProcessbutton();
        protractor_1.browser.sleep(2000);
        new BasePage_1.BasePage().clickCustomerTab();
        protractor_1.browser.sleep(5000);
        log4jsconfig_1.log4jsconfig.Log().debug("Verifying Customer Entry and Delete");
        new customersPage_1.CustomerPage().VerifyCustEntryAndDelete();
        protractor_1.browser.sleep(2000);
    });
});
