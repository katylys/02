"use strict";
exports.__esModule = true;
var class_validator_1 = require("class-validator");
var validator = new class_validator_1.Validator();
exports.ShortenerReq = function (params) {
    return /* validator.isString(params.userID) &&  */ validator.isString(params.longURL);
};
exports.RedirectionReq = function (params) {
    return validator.isString(params.shortURL);
};
exports.StatisticReq = function (params) {
    return validator.isString(params.shortURL);
};
