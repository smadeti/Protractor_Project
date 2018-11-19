import { element, browser ,by } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig"

var first = element(by.model("first"));
var second = element(by.model("second"));
var goButton = element(by.id("gobutton"));  
var result = element(by.className("ng-binding"));
    
describe("Enter Calculator App:",function(){
    
    beforeEach(function(){
        browser.get("http://www.way2automation.com/angularjs-protractor/calc/");

    });

    it('launching URL: ',function(){
        expect(browser.getTitle()).toContain("Protractor practice website - Calculator"); 
        let browserTitle  = browser.getTitle();
        browserTitle.then(function(txt){
        console.log("Application Title is :" + txt);    
        log4jsconfig.Log().debug("Application Title is :" + txt);

        })




    });


    it("To check URL: ",function(){
     expect(browser.getTitle()).toContain("Protractor practice website - Calculator");

    });

    it("To Add two numbers: ",function(){
        first.sendKeys(1);
        second.sendKeys(3);
        goButton.click();
        expect(result.getText()).toContain("4");   

    });

});