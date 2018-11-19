"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const log4jsconfig_1 = require("../conf/log4jsconfig");
var first = protractor_1.element(protractor_1.by.model("first"));
var second = protractor_1.element(protractor_1.by.model("second"));
var goButton = protractor_1.element(protractor_1.by.id("gobutton"));
var result = protractor_1.element(protractor_1.by.className("ng-binding"));
describe("Enter Calculator App:", function () {
    beforeEach(function () {
        protractor_1.browser.get("http://www.way2automation.com/angularjs-protractor/calc/");
    });
    it('launching URL: ', function () {
        expect(protractor_1.browser.getTitle()).toContain("Protractor practice website - Calculator");
        let browserTitle = protractor_1.browser.getTitle();
        browserTitle.then(function (txt) {
            console.log("Application Title is :" + txt);
            log4jsconfig_1.log4jsconfig.Log().debug("Application Title is :" + txt);
        });
    });
    it("To check URL: ", function () {
        expect(protractor_1.browser.getTitle()).toContain("Protractor practice website - Calculator");
    });
    it("To Add two numbers: ", function () {
        first.sendKeys(1);
        second.sendKeys(3);
        goButton.click();
        expect(result.getText()).toContain("4");
    });
});
