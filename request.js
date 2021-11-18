const http = require("http");
const request = require("request");
const fs = require("fs");

var reqBody = undefined;
var htmlContent = undefined;

function creatHtmlJsonToString(retriviedData) {
  var bodyBegin = htmlContent.indexOf('<body>');
  var bodyEnd = htmlContent.indexOf('</body>');
  var stringBeginBody = htmlContent.slice(0, bodyBegin + 6);
  var stringEndBody = htmlContent.slice(bodyEnd);
  var htmlString = '<table>\n';

  htmlString += "<tr>\n";
  for (var attribute in retriviedData[0]) {
    if (typeof retriviedData[0][attribute] !== "object") {
      htmlString += "<td>" + attribute + "</td>\n";
    }
  }
  htmlString += "</tr>\n";

  retriviedData.forEach((object) => {
    htmlString += "</tr>\n";
    for (var attribute in object) {
      if (typeof object[attribute] !== "object") {
        htmlString += "<td>" + object[attribute] + "</td>\n";
      }
    }
    htmlString += "</tr>\n";
  });
  htmlString += "</table>";
  return stringBeginBody + htmlString + stringEndBody;
};

request("https://www.bnefoodtrucks.com.au/api/1/trucks", (err, req, body) => {
  reqBody = body;
});

http
  .createServer((req, res) => {
    if (reqBody && htmlContent) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(creatHtmlJsonToString(JSON.parse(reqBody)));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("nothing retrivied");
    }
  })
  .listen(3000);

  fs.readFile('./index.html', (err, html) => {
    if (err) {
      throw err;
    }
    htmlContent = html;
  })