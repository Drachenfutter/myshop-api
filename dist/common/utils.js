"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = void 0;
var nanoid_1 = require("nanoid");
function uuid() {
    var nanoid = nanoid_1.customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 32);
    return nanoid();
}
exports.uuid = uuid;
