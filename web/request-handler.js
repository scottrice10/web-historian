var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!
//

var router = {
  '/': httpHelper.serveAssets
};

var callback = function(err, contents, res) {
  if (err) {
    console.log(err);
  } else {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    res.write(contents);
    res.end();
  }
};

exports.handleRequest = function(req, res) {
  if (req.method === "GET") {
    console.log('pathname:', url.parse(req.url).pathname);
    if (url.parse(req.url).pathname === "/") {
      httpHelper.serveAssets(res, '/index.html', callback);
    }
  }
};
