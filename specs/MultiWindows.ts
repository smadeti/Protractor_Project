import { element, browser ,by, Browser } from "protractor";
import { log4jsconfig } from "../conf/log4jsconfig";


var first = element(by.model("first"));
var second = element(by.model("second"));
var goButton = element(by.id("gobutton"));  
var result = element(by.className("ng-binding"));
    
describe("Multiple Window Handling in Protractor",function(){
    
    beforeEach(function(){
        browser.ignoreSynchronization = true;
        browser.get("https://skpatro.github.io/demo/links/");

    });

    it("Multiple Windows handling ",function(){
        browser.getTitle().then(function(txt){
            console.log("Main window handle Title is :" + txt);
        })
        browser.findElement(by.name('NewWindow')).click();
        let windowHandles = browser.getAllWindowHandles();
        let parentHandle,childHandle;

        windowHandles.then(function(handles){
            parentHandle = handles[0];
            childHandle = handles[1];
            console.log("Max Windows in the current Application: " + handles.length);
            browser.switchTo().window(childHandle).then(function(){
            browser.getTitle().then(function(txt){
            console.log("Switched to Child Window: " + txt);
            browser.close();
            })
            browser.switchTo().window(parentHandle).then(function(){
                console.log("Switching back to ParentHandle");

                browser.getTitle().then(function(txt){
                console.log("Main browser Title: " + txt) ;
                })
            })
            })
        })
        })

        
        
   });

