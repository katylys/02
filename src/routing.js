"use strict";
exports.__esModule = true;
var shorten_1 = require("./shortener/shorten");
var myURLs_1 = require("./list/myURLs");
var statistic_1 = require("./statistic/statistic");
var redirect_1 = require("./redirection/redirect");
var main_1 = require("./main");
var express = require("express");
exports.getRouter = function () {
    var router = express.Router();
    router.get('/', function (req, res) {
        res.status(200).send({
            message: 'ok'
        });
    });
    router.get('/shortener', function (req, res) { return shorten_1.Shorten(req, res, main_1.db); });
    router.get('/myURLs', function (req, resp) { return myURLs_1.MyURLs(req, resp, main_1.db); });
    router.get('/statistic', function (req, resp) { return statistic_1.Statistic(req, resp, main_1.db); });
    router.get('/:shortURL', function (req, resp) { return redirect_1.Redirect(req, resp, main_1.db); });
    return router;
};
