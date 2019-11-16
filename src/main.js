"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var express = require("express");
var bodyParser = require("body-parser");
var shorten_1 = require("./shortener/shorten");
var redirect_1 = require("./redirection/redirect");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var db;
exports.MONGOURL = 'mongodb://localhost:27017';
exports.clientMongo = mongodb_1.MongoClient.connect(exports.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function (client) {
    db = client.db('Shortener02');
    client.db('Shortener02').collection('Counter').insertOne({
        count: 1
    });
    client.db('Shortener02').collection('URLs');
})["catch"](function (e) {
    console.error(e);
    process.exit(1);
});
//app//.use(router.routes())
//.use(router.allowedMethods())
//  .use(bodyParser())
/* app.use('/', (req, res) => {
  res.status(200).send({
    message: 'ok',
  })
}) */
app.use('/shortener', function (req, res) { return shorten_1.Shorten(req, res, db); });
app.use('/:shortURL', function (req, resp) { return redirect_1.Redirect(req, resp, db); });
app.set('port', 4000);
var server = app.listen(app.get('port'), function () {
    console.log("Express running \u2192 PORT " + app.get('port'));
});
process.on('SIGINT', function () {
    process.exit(1);
});
