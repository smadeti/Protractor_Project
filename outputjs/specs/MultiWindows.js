"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
var first = protractor_1.element(protractor_1.by.model("first"));
var second = protractor_1.element(protractor_1.by.model("second"));
var goButton = protractor_1.element(protractor_1.by.id("gobutton"));
var result = protractor_1.element(protractor_1.by.className("ng-binding"));
describe("Multiple Window Handling in Protractor", function () {
    beforeEach(function () {
        protractor_1.browser.ignoreSynchronization = true;
        protractor_1.browser.get("https://skpatro.github.io/demo/links/");
    });
    it("Multiple Windows handling ", function () {
        protractor_1.browser.getTitle().then(function (txt) {
            console.log("Main window handle Title is :" + txt);
        });
        protractor_1.browser.findElement(protractor_1.by.name('NewWindow')).click();
        let windowHandles = protractor_1.browser.getAllWindowHandles();
        let parentHandle, childHandle;
        windowHandles.then(function (handles) {
            parentHandle = handles[0];
            childHandle = handles[1];
            console.log("Max Windows in the current Application: " + handles.length);
            protractor_1.browser.switchTo().window(childHandle).then(function () {
                protractor_1.browser.getTitle().then(function (txt) {
                    console.log("Switched to Child Window: " + txt);
                    protractor_1.browser.close();
                });
                protractor_1.browser.switchTo().window(parentHandle).then(function () {
                    console.log("Switching back to ParentHandle");
                    protractor_1.browser.getTitle().then(function (txt) {
                        console.log("Main browser Title: " + txt);
                    });
                });
            });
        });
    });
});
