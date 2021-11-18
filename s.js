const http = require('http');
const moment = require('moment');

const serverCallback = (req, res) => {
  const beginTime = moment("10:00","HH:mm:ss");
  const endTime = moment("18:00","HH:mm:ss");
  const now = moment();

  let message = "Hello"+"!\n"
  message += "welcome bro"
  message += "now is"+moment().format("HH:mm:ss")+"!\n"
  message += "our business works from" + beginTime.format("HH:mm:ss") + " to" + endTime.format("HH:mm:ss")

  let beginDiff = beginTime.diff(moment(),"minutes")
  let endDiff = now.diff(endTime,"minutes")
  
  if(beginDiff > 0) {
    message += "Come back in" + beginDiff + " minutes. \n"
    }
  if(endDiff > 0) {
      message += "Come back tomorrow. \n"
    }
  res.writeHead(200, {'Content-type': 'text/plain'});
  res.end(message);
}
http.createServer(serverCallback).listen(3000);