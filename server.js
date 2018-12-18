var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", (req, res) => {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const forwardedForArray = xForwardedFor.split(',');
  const ip = forwardedForArray[0];
  
  const acceptLanguage = req.headers['accept-language'];
  const userAgent = req.headers['user-agent']
  
  const returnedJson = {
    ipaddress: ip,
    language: acceptLanguage,
    software: userAgent
  }
  
  res.json(returnedJson);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
