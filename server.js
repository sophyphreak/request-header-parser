var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  const language = req.get('accept-language');
  const ipaddress = req.ip.slice(7);
  const software = req.get('user-agent');
  
  const returnedJson = {
    ipaddress,
    language,
    software
  }
  
  res.json(returnedJson);
});

app.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});
