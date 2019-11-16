"use strict";
exports.__esModule = true;
var class_validator_1 = require("class-validator");
exports.IsValidRequestShort = function (params) {
    var validator = new class_validator_1.Validator();
    return /* validator.isString(params.userID) &&  */ validator.isString(params.longURL);
};
exports.IsValidReqRedirect = function (params) {
    var validator = new class_validator_1.Validator();
    return validator.isString(params.shortURL);
};
