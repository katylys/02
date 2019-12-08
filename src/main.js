"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var express = require("express");
var bodyParser = require("body-parser");
var createError = require("http-errors");
var routing_1 = require("./routing");
var dbTypes_1 = require("./db/dbTypes");
exports.app = express();
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(bodyParser.json());
//export let db: Db
exports.MONGOURL = 'mongodb://localhost:27017';
exports.mongoDbPromise = mongodb_1.MongoClient.connect(exports.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function (cl) { return cl; });
console.log(exports.mongoDbPromise);
exports.mongoDbPromise
    .then(function (client) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exports.db = client.db('Shortener02');
                return [4 /*yield*/, exports.db.collection(dbTypes_1.DB.storeCounter)
                        .insertOne({
                        count: 1
                    })["catch"](function (error) { return console.error(error); })];
            case 1:
                _a.sent();
                exports.db.collection(dbTypes_1.DB.storeURLs);
                exports.app.use('/', routing_1.getRouter(exports.db));
                exports.app.use(function (_req, _res, next) {
                    next(createError(404));
                });
                exports.app.set('port', 4000);
                exports.server = exports.app.listen(exports.app.get('port'), function () {
                    console.log("Express running \u2192 PORT " + exports.app.get('port'));
                });
                return [2 /*return*/, client];
        }
    });
}); })["catch"](function (error) {
    console.error(error);
    process.exit(1);
});
console.log(exports.mongoDbPromise);
//export const db = Promise.all([mongoDbPromise]).then((db) => db).catch((error) => console.log(error))
process.on('SIGINT', function () {
    process.exit(1);
});
