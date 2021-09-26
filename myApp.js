require('dotenv').config()

var express = require("express");
var app = express();
console.log("Hello World");
/*app.get('/', function(req, res) {
    res.send('Hello Express');
  }
)
*/

app.use(function(req, res, next){
  console.log(req.method + " " + req.path+ " " + "-" + " " + req.ip);
  next();
})

app.get('/now', function(req, res, next){
  let t = new Date();
  req.time = t.toString();
  next();
}, function(req, res){
  res.send({time: req.time});
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toLocaleUpperCase();
  }else {
    response = "Hello json" ;
  }
  res.json({"message":response});

});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
