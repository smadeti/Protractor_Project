import {Config,browser} from "protractor"

var HtmlReporter = require('protractor-beautiful-reporter');

// var reporter = new HtmlReporter({
//     baseDirectory: 'tmp/screenshots',
//     screenshotsSubfolder: 'images'
    
//  });

var ts = new Date();
console.log(ts.toDateString());
console.log(ts.toUTCString().replace(/:/g,'_'));


export let config: Config = {

    framework : "jasmine",

    capabilities:{

        browserName : 'chrome'
        // browserName : 'firefox',
        // marionette : true,
        // acceptSslCerts : true
    },

    //Running test suites, like smoke,sanity,Regression
    suites : {
        calc: ['./specs/calculator.js'],
        bank: ['./testspec/bankTest.js'],
        bothapp: ['./specs/calculator.js', './testspec/bankTest.js'],
        bankPOM: ['./testspec/banktestPOM.js']
    },

    //Running single test case:
   // specs : ['./testspec/banktestPOM.js'],

    //specs : ['./specs/MultiWindows.js'],
    specs : ['./bankTest_PageObject/bankTestWithPageObject.js'],

     seleniumAddress: 'http://localhost:4444/wd/hub',

    onPrepare:()=>{
        (global as any).isAngularSite = function(flag: boolean){
            browser.ignoreSynchronization = !flag;
        }
        var os = require('os');
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(4000);

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'tmp/screenshots',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docTitle: 'PROTRACTOR REPORT',
          //  docName: ts.toDateString() + 'index.html'
          docName: ts.toString().replace(/:/g,'_') + '_RESULTS.html' ,
                   
         }).getJasmine2Reporter());        
    }


}