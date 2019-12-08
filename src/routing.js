"use strict";
exports.__esModule = true;
var express = require("express");
var shorten_1 = require("./shortener/shorten");
var myURLs_1 = require("./list/myURLs");
var statistic_1 = require("./statistic/statistic");
var redirect_1 = require("./redirection/redirect");
var types_1 = require("./types");
exports.getRouter = function (db) {
    var router = express.Router();
    router.get('/', function (_req, res) {
        res.status(200).send({
            message: 'ok'
        });
    });
    router.get(types_1.Shortener.URL, function (req, res) { return shorten_1.Shorten(req, res, db); });
    router.get(types_1.List.URL, function (req, resp) { return myURLs_1.MyURLs(req, resp, db); });
    router.get(types_1.Statistic.URL, function (req, resp) { return statistic_1.GetStatistic(req, resp, db); });
    router.get(types_1.Redirection.URL, function (req, resp) { return redirect_1.Redirect(req, resp, db); });
    return router;
};
