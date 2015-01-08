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

// exports.handleRequest = function(req, res) {
//   if (req.method === "GET") {
//     if (url.parse(req.url).pathname === "/") {
//       console.log(url.parse(req.url).pathname);
//       res.writeHead(200, {
//         "Content-type": "text/html"
//       });
//       res.write("<input>");
//       res.end();
//     }
//   }
// };


exports.handleRequest = function(req, res) {
  if (req.method === "GET") {
    if (url.parse(req.url).pathname === "/") {
      fs.readFile(__dirname + "/public/index.html", function(err, contents) {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, {
            "Content-type": "text/html"
          });
          res.write(contents);
          res.end();
        }
      });
    }
  }
};
