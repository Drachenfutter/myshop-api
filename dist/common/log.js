"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
var labels_1 = require("./labels");
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, printf = winston_1.format.printf;
var myFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp;
    return timestamp + " [" + level + "] " + message;
});
exports.logger = winston_1.createLogger({
    level: labels_1.PARMS.LOG_LEVEL,
    format: combine(winston_1.format.colorize(), timestamp(), myFormat),
    defaultMeta: { service: labels_1.CONST.APP_NAME },
    transports: [
        new winston_1.transports.Console()
    ],
});
