var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "be04aadd65ac8ee99afea66103706769",
        "instanceId": 9196,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541682838239,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541682838818,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541682838886,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541682839462,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541682839982,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541682839255 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541682840176,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541682842443,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00e600b0-0013-0057-0005-000100820058.png",
        "timestamp": 1541682836501,
        "duration": 5954
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f33cef54c3d69c4dc65335bc1b14f71e",
        "instanceId": 7876,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683397481,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541683397515,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541683398060,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683398146,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683398717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683399156,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541683398504 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683399659,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0017003c-0015-00e2-003e-0008000400bc.png",
        "timestamp": 1541683395255,
        "duration": 5906
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "42ae44ceac63fa58a99efbdf8354938e",
        "instanceId": 8464,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683666752,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541683667545,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683667611,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683668279,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541683668008 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683668802,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541683670529,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00760040-00da-00bc-0024-00f100ab0022.png",
        "timestamp": 1541683664445,
        "duration": 6107
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "69f4b1033abb1fce186cc633d83ec4fb",
        "instanceId": 472,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683798513,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541683798701,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541683799191,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683799270,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683799866,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683800080,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541683799619 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683800558,
                "type": ""
            }
        ],
        "screenShotFile": "images\\003200c7-0046-005a-0007-00ac00580010.png",
        "timestamp": 1541683797079,
        "duration": 5030
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "23fa4c9a6d10f1a03b66b133fcd4f281",
        "instanceId": 8264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683940892,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541683942386,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683942462,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541683943249,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541683942910 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541683943738,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541683945133,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ce00e0-00c6-0046-0073-00db005a00e4.png",
        "timestamp": 1541683937772,
        "duration": 7381
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "8246270faaab66cd11bd81704998cf87",
        "instanceId": 5856,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684006518,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684006877,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684007409,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684007482,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684008176,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684008614,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684007906 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684008856,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00de0065-0016-00b6-00d6-0076003c00d9.png",
        "timestamp": 1541684004070,
        "duration": 6426
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "55f98f927fd016164fa2661da7c2da19",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684090682,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684090798,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684091381,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684091453,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684092090,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684092253,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684091833 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684092862,
                "type": ""
            }
        ],
        "screenShotFile": "images\\006b00dd-000d-00ba-0091-00de00a80039.png",
        "timestamp": 1541684088853,
        "duration": 5499
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d7c23edcfab88439f231a0cd6a01bd2c",
        "instanceId": 7016,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684171504,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684171736,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684172187,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684172343,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684173158,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684172808 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684173643,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0094008b-00dd-00c1-0023-00210050009d.png",
        "timestamp": 1541684169323,
        "duration": 6230
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6d4504d0984f5e7d0d4e23ac9d59447a",
        "instanceId": 8000,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684274850,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684274963,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684275623,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684275764,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684276418,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684276588,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684276181 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684277221,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000900f5-0013-0004-00b9-007900a60085.png",
        "timestamp": 1541684272218,
        "duration": 6711
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ce4b25f919acaa6bee3b369eea5bfa71",
        "instanceId": 2148,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684324563,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684324644,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684325040,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684325121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684325646,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684325859,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684325507 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684326493,
                "type": ""
            }
        ],
        "screenShotFile": "images\\003600f9-000d-00b5-006a-00c200f90039.png",
        "timestamp": 1541684322872,
        "duration": 5036
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "59166d11d35494f25b54b404dcd1257c",
        "instanceId": 8576,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684387582,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684387813,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684388153,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684388234,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684389461,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684390008,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684389290 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684390168,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00e30086-00ec-0007-0041-00de00680068.png",
        "timestamp": 1541684386169,
        "duration": 5719
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "49e72cb30bb0d459de2ca427217e9ac1",
        "instanceId": 1824,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684431476,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684431646,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684435801,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684435901,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684439156,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684438515 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684439515,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00df001e-007e-00fc-00db-005900cb00b0.png",
        "timestamp": 1541684430410,
        "duration": 10615
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e6e104d244d22107c40853456cf5c0f1",
        "instanceId": 8732,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684533523,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684533861,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684534129,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684534203,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684534841,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684534587 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684535285,
                "type": ""
            }
        ],
        "screenShotFile": "images\\006700a5-0027-0024-007a-005c009300d7.png",
        "timestamp": 1541684531383,
        "duration": 5494
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c6945c8af6549e4e20726ee04a1a466b",
        "instanceId": 7192,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684628300,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684628616,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684629066,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684629143,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684629731,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684629924,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684629501 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684630259,
                "type": ""
            }
        ],
        "screenShotFile": "images\\004c00cd-009a-00a0-00df-001a008f00b1.png",
        "timestamp": 1541684626429,
        "duration": 5740
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "47abdc8fa8ee431db62ec4ee46479b7a",
        "instanceId": 8528,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684746229,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684747062,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684747180,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684747784,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684747553 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684748468,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684750158,
                "type": ""
            }
        ],
        "screenShotFile": "images\\001400c0-0034-00fc-0013-0061005a00dd.png",
        "timestamp": 1541684744721,
        "duration": 5449
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "17efdc421a941843b6ddbbd596089d24",
        "instanceId": 4592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684833311,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541684833981,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684834094,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541684834789,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541684834491 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541684835293,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541684838331,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00090001-0054-005a-00ea-00dd00f20012.png",
        "timestamp": 1541684831510,
        "duration": 6840
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b709a6b1fab56eca85c03bd5a78f8e6e",
        "instanceId": 2168,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685257052,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541685257371,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541685257946,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685258016,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685258632,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541685258417 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685259186,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00d20024-0075-0045-0087-00c1003500b7.png",
        "timestamp": 1541685255387,
        "duration": 5468
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e73b43b83f254d002cb9cb84f3dd1a7d",
        "instanceId": 7976,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685297611,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541685297818,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541685298296,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685298376,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685299107,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541685298793 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685299767,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009400cd-00bd-0044-0061-007700fd00f3.png",
        "timestamp": 1541685295663,
        "duration": 6005
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1779834d8b02233e097067b0aac3b9ea",
        "instanceId": 6108,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685341566,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541685341681,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541685342113,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685342402,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685343011,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685343249,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541685342836 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685343598,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0093004e-0008-0059-00bd-00dd0093001c.png",
        "timestamp": 1541685339563,
        "duration": 5747
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "23f369c1c51f5a85e617169498f7d90a",
        "instanceId": 6552,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685389109,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541685389424,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541685390362,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685390442,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685392259,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541685391179 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685392409,
                "type": ""
            }
        ],
        "screenShotFile": "images\\001300a9-00dd-005c-0083-0084004700b0.png",
        "timestamp": 1541685386782,
        "duration": 7323
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "f98bab669ce9dbf144f1cfabe0b1ca7f",
        "instanceId": 8256,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685432440,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541685432473,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541685433356,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685433612,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685434084,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541685433830 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685435309,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0056004c-0057-00f5-005d-007800b200d1.png",
        "timestamp": 1541685430551,
        "duration": 5991
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "ca5fa455e8f09bb3b9dbdbe233a53f18",
        "instanceId": 9592,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685707390,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541685708125,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685708225,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685708886,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541685709383,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541685708630 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541685709536,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541685711138,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ec0009-00f0-00f9-00b1-006700b300fb.png",
        "timestamp": 1541685704854,
        "duration": 6306
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "df824daf6ab982702c1f65b04e012d0f",
        "instanceId": 9680,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686124593,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541686124851,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541686125398,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686125474,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686126352,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541686125911 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686126793,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00e40044-006a-00dc-00e8-00cc0098000b.png",
        "timestamp": 1541686122638,
        "duration": 5792
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d66a57204402594eed80cf9dabb21965",
        "instanceId": 6984,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686198823,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541686199187,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541686199556,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686199627,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686200330,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541686200009 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686202518,
                "type": ""
            }
        ],
        "screenShotFile": "images\\002d00b9-002f-009c-005f-006100840052.png",
        "timestamp": 1541686197462,
        "duration": 5493
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "57d92efb93a879101b45a28fd8853fdc",
        "instanceId": 9352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686508385,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541686508519,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541686509024,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686509098,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686509787,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686510312,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541686509528 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686510375,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0057002f-0007-0056-00cb-00ec009c00a5.png",
        "timestamp": 1541686506603,
        "duration": 5447
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "959db7476f509a1d0916e0113bbeb3cb",
        "instanceId": 7548,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686705298,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541686705342,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541686706029,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686706095,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686706676,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541686706463 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686707376,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00c40019-0001-008a-00b3-004a00e20016.png",
        "timestamp": 1541686703601,
        "duration": 5417
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d1adad8034c122d24b8de1f0591ffbcf",
        "instanceId": 7452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686862939,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541686863366,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541686863808,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686863902,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686864606,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541686864292 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686865141,
                "type": ""
            }
        ],
        "screenShotFile": "images\\001f0074-0048-0005-0005-004d003900b6.png",
        "timestamp": 1541686860960,
        "duration": 5843
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "60fb984ad0a45b7da2ff75166408a32a",
        "instanceId": 9488,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686957914,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541686957975,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686958609,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541686959584,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541686959114 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541686960203,
                "type": ""
            }
        ],
        "screenShotFile": "images\\0073005c-00bc-003c-0006-0044001c0051.png",
        "timestamp": 1541686955466,
        "duration": 6244
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "6466a43a45e7a67454dc7adc76a39eb9",
        "instanceId": 6352,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.77"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541747218789,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1541747219074,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1541747219456,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541747219521,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1541747220060,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1541747219867 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1541747221069,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ce0090-00d5-00b1-0073-00af00570084.png",
        "timestamp": 1541747216882,
        "duration": 5127
    },
    {
        "description": "Multiple Windows handling |Multiple Window Handling in Protractor",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "8ec3824ab4b3879cae4097fd93a78e91",
        "instanceId": 7816,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1542348580007,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://skpatro.github.io/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1542348580356,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://qavalidation.com/about-me/ - Failed to set referrer policy: The value '' is not one of 'no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', or 'unsafe-url'. The referrer policy has been left unchanged.",
                "timestamp": 1542348580809,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1542348580893,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1542348582345,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://connect.facebook.net/en_US/sdk.js?_=1542348581335 - Failed to load resource: net::ERR_CONNECTION_RESET",
                "timestamp": 1542348582880,
                "type": ""
            }
        ],
        "screenShotFile": "images\\001500a7-00a1-0060-0087-0079009b001d.png",
        "timestamp": 1542348577349,
        "duration": 7197
    },
    {
        "description": "encountered a declaration exception|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "e7974982f1921dd2b05053321f72e327",
        "instanceId": 5192,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Error: Cannot find module '../specs/bank_home_addCustomerPage.js'"
        ],
        "trace": [
            "Error: Cannot find module '../specs/bank_home_addCustomerPage.js'\n    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:580:15)\n    at Function.Module._load (internal/modules/cjs/loader.js:506:25)\n    at Module.require (internal/modules/cjs/loader.js:636:17)\n    at require (internal/modules/cjs/helpers.js:20:18)\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:7:25)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:1:63)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00a10074-0086-0044-009c-003600980018.png",
        "timestamp": 1542352281688,
        "duration": 8491
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2ee44e4feec25117a27b7a40018ed93a",
        "instanceId": 1452,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: bank_homepage.getFirstName is not a function"
        ],
        "trace": [
            "TypeError: bank_homepage.getFirstName is not a function\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:10:24)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:9:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:1:63)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00ad00d6-0042-002b-00c7-00f600ee00f8.png",
        "timestamp": 1542352390218,
        "duration": 3090
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "52c44866550f568580cd7c373eff616e",
        "instanceId": 2532,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: bank_homepage.enterFirstName is not a function"
        ],
        "trace": [
            "TypeError: bank_homepage.enterFirstName is not a function\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:10:24)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:9:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:1:63)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00950096-0076-0080-009d-0060009a0028.png",
        "timestamp": 1542352687486,
        "duration": 8105
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7ccb923bb2450bfbb78ff3dc767956d5",
        "instanceId": 3192,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: bank_homepage.getFirstName is not a function"
        ],
        "trace": [
            "TypeError: bank_homepage.getFirstName is not a function\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:10:24)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:9:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:1:63)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00f700b0-0025-00d4-00d5-00bb005600a1.png",
        "timestamp": 1542353021266,
        "duration": 3558
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "238acc631509b9165013535f2e587ab2",
        "instanceId": 7920,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00e400ed-00a4-0010-00f1-009700b7002c.png",
        "timestamp": 1542359890554,
        "duration": 10017
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "9b47546eed57a0fd7a7cdbbe6b9a1b59",
        "instanceId": 4440,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: No element found using locator: by.model(\"custId\")"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: by.model(\"custId\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:831:22)\n    at openAccount_page.selectCustomer (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\bank_openAccountPage.js:4:71)\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:22:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:14:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:6:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\006600f6-00e4-008a-009e-007d004a002f.png",
        "timestamp": 1542362089131,
        "duration": 10830
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d0fc9af740d6d6952cbc4a9cc7b87364",
        "instanceId": 7740,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [value = \" 3 \" ])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [value = \" 3 \" ])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:831:22)\n    at openAccount_page.selectCustomer (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\bank_openAccountPage.js:8:71)\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:25:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:14:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:6:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\001700d6-0021-0076-0023-0023007700ed.png",
        "timestamp": 1542362496278,
        "duration": 16905
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "beaa094e9640143ff20bce649ff16629",
        "instanceId": 4440,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [value = \" 3 \" ])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [value = \" 3 \" ])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:831:22)\n    at openAccount_page.selectCustomer (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\bank_openAccountPage.js:8:69)\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:25:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:14:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:6:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\001b0032-0026-00cd-004a-004c00950040.png",
        "timestamp": 1542362600074,
        "duration": 13876
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "27a87e7da1c7322d6202dc9fd0592664",
        "instanceId": 1120,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [value = \" + index + \" ])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [value = \" + index + \" ])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:831:22)\n    at openAccount_page.selectCustomer (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\bank_openAccountPage.js:8:67)\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:25:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:14:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:6:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00d70044-0092-00fa-003f-002c00710090.png",
        "timestamp": 1542362712300,
        "duration": 13550
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "7b3db735c9bc55b3c686b09c8e3cfc05",
        "instanceId": 1620,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [value = \" Pound\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [value = \" Pound\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\built\\element.js:831:22)\n    at openAccount_page.selectCurrency (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\bank_openAccountPage.js:12:69)\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:26:27)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:14:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\specs\\banTestWithPageObject.js:6:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00ea0025-00af-0079-006a-0045009d0025.png",
        "timestamp": 1542362807436,
        "duration": 15308
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "698bf17627a29d3cfb59c82e9363e67f",
        "instanceId": 7608,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00320047-00f1-0095-00a7-000100dc0026.png",
        "timestamp": 1542362867751,
        "duration": 15510
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c0f76d3c3aef0f0c73e553d82b2060d3",
        "instanceId": 3284,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0060002d-00f9-0048-00c4-00fe002900cb.png",
        "timestamp": 1542364044766,
        "duration": 18274
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "cd4b0b000ca86bca041ec11cd75dcfde",
        "instanceId": 8076,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\006f0071-006e-0067-001c-00e30099008d.png",
        "timestamp": 1542364152849,
        "duration": 16100
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "27ed72d261298d73d1be6ab07537b881",
        "instanceId": 4744,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00cc0011-00ab-001c-005d-00b500aa004d.png",
        "timestamp": 1542364313982,
        "duration": 16782
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "fbd32c542699d1f8841861097fd79d13",
        "instanceId": 1208,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0084002a-0026-00cd-00d2-00bf000c003d.png",
        "timestamp": 1542364481679,
        "duration": 15627
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "22ca47477e94615db20f4a406a7bb6f1",
        "instanceId": 7648,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f0008e-0015-0075-0020-004d002f00ae.png",
        "timestamp": 1542364690918,
        "duration": 18851
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "006d8a483c49e8e0b96707c9dafd2d79",
        "instanceId": 7628,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002000b6-0006-0083-0019-00ae00380019.png",
        "timestamp": 1542364957973,
        "duration": 20265
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2b0a06b868bf4177842d6a907646377d",
        "instanceId": 8088,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ab00ad-00f6-0052-009e-002a00bb0015.png",
        "timestamp": 1542365217905,
        "duration": 17779
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "aba356fe4b0c03f2c70e9992eb55d763",
        "instanceId": 5264,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\005f003c-00a8-0031-00b7-007b00f40012.png",
        "timestamp": 1542365458595,
        "duration": 18186
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "af21f83b477b035cc1c1e254f6a663fe",
        "instanceId": 7160,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL."
        ],
        "trace": [
            "Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.\n    at Timeout._onTimeout (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4281:23)\n    at ontimeout (timers.js:436:11)\n    at tryOnTimeout (timers.js:300:5)\n    at listOnTimeout (timers.js:263:5)\n    at Timer.processTimers (timers.js:223:10)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00e70057-00f1-002c-00dd-002f00ed0034.png",
        "timestamp": 1542365607585,
        "duration": 42006
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "43c2bb9fd1bf0cf52ccbce8b15110e04",
        "instanceId": 4176,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00f20068-00c3-006e-00bc-009d0008009f.png",
        "timestamp": 1542365705103,
        "duration": 19499
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "2fdc1f24184bc5d1bcfe6c4e4e899e9a",
        "instanceId": 7804,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00ba00af-007a-000b-00b9-00fa00d90026.png",
        "timestamp": 1542365868632,
        "duration": 18731
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "479eb13bb38fb7b1561f6342f4e56a24",
        "instanceId": 7428,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\004000ce-007e-000a-00ef-00e100e000b6.png",
        "timestamp": 1542368429483,
        "duration": 20599
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "17fb94de24f40561cf15c756e3515dd4",
        "instanceId": 6628,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00a80076-0075-0024-00bf-008f00ce001d.png",
        "timestamp": 1542609485635,
        "duration": 17963
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "c5f669f30bb7971f7b65336084f284e9",
        "instanceId": 2036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\0065008e-0019-003f-009b-00ab004d00b2.png",
        "timestamp": 1542611773558,
        "duration": 18512
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "28c905a238a1ba7aff8e87eda10ff3af",
        "instanceId": 2120,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Expected Function to be undefined."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:16:49)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00170045-007f-00b8-0025-0027008000e8.png",
        "timestamp": 1542613625092,
        "duration": 18553
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "1badf5517985b656ecb01b2b117e4629",
        "instanceId": 6036,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Expected Function to be 'Shyam'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:16:49)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0063001d-009c-00fa-00c4-0010007c00fe.png",
        "timestamp": 1542613682652,
        "duration": 18315
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "d7e4e9bc223dcd37d9603e12fa12e3b8",
        "instanceId": 4148,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Expected '' to be 'Shyam'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:16:51)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\002c007f-00b2-0052-00cf-003800510065.png",
        "timestamp": 1542613731399,
        "duration": 19646
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "56a12fa5c0b0d7435d7288bad211ef0d",
        "instanceId": 8132,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Expected '[object Object]' to be 'Shyam'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:18:22)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0070007b-00e3-00ee-0076-00d5008e00ca.png",
        "timestamp": 1542613936334,
        "duration": 20038
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "49da052190089c892ae9920b1e4b7db0",
        "instanceId": 5944,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Expected '' to be 'Shyam'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:18:22)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00b3002f-0027-0006-009b-00b000af001d.png",
        "timestamp": 1542614000523,
        "duration": 19048
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "90d6d937352fc26dd83282d499ee7a1c",
        "instanceId": 9032,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d20019-0015-0015-0085-00f600b3005f.png",
        "timestamp": 1542614195498,
        "duration": 17656
    },
    {
        "description": "Lauching BankPage|Testing BankApp using Page Objects",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "21c0a971c2a880709612691965a265ff",
        "instanceId": 4708,
        "browser": {
            "name": "chrome",
            "version": "70.0.3538.102"
        },
        "message": [
            "Failed: git is not defined"
        ],
        "trace": [
            "ReferenceError: git is not defined\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:15:46)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Lauching BankPage\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:11:5)\n    at addSpecsToSuite (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\smadeti\\Documents\\GITHUB_REPORT\\outputjs\\bankTest_PageObject\\bankTestWithPageObject.js:3:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00310075-00c8-00e5-00d3-00e1005b00cd.png",
        "timestamp": 1542616143676,
        "duration": 2335
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
