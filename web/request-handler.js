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
    res.writeHead(302, {
      "Content-type": "text/html"
    });
    res.write("file not found");
    res.end();
  } else {
    res.writeHead(200, {
      "Content-type": "text/html"
    });
    res.write(contents);
    res.end();
  }
};


exports.handleRequest = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  if (req.method === "GET") {
    if (url.parse(req.url).pathname === "/") {
      httpHelper.serveAssets(res, '/index.html', callback);
    } else {
      httpHelper.serveArchive(res, pathname, callback);
    }
  } else if (req.method === "POST") {
    var uri = "";

    req.on('data', function(chunk) {
      uri += chunk;
    });

    req.on('end', function() {
      uri = uri.split("=")[1];
      var inList = archive.isUrlInList(uri, function(contents) {
        var lines = contents.split("\n");
        return lines.indexOf(uri) > -1;
      });

      if (!inList) {
        console.log("sending loading.html...");
        archive.addUrlToList(uri);
      } else {
        res.writeHead(302, {
          "Content-type": "text/html"
        });
        res.write(uri);
      }
      res.end();
    });
  };
};
