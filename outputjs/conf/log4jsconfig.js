"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class log4jsconfig {
    static Log() {
        var log4js = require('log4js');
        log4js.configure('./conf/log4js.json');
        let log = log4js.getLogger("default");
        return log;
    }
}
exports.log4jsconfig = log4jsconfig;
