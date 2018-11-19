export class log4jsconfig{

    static Log() : any {
        var log4js = require('log4js');
        log4js.configure('./conf/log4js.json');
        let log = log4js.getLogger("default");
        return log;

    }
    
}