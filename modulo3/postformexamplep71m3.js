var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
  res.send(
'<!DOCTYPE HTML>'+
'<html lang="en">'+
'<head>'+
'  <meta charset="UTF-8">'+
'  <title>Form Example</title>'+
'</head>'+
'  <body>'+
'    <form method="post" action="/process">'+
'      Su nombre:'+
'      <input type="text" name="user" value="Teclee su nombre" autofocus/>'+
'      <br />'+
'      <input type="submit" value="Enviar"/>'+
'    </form>'+
'  </body>'+
'</html>'
  );
});

app.post('/process', function(req, res) {
  res.send('Hola '+req.body.user+'<br/> <a href="/">back</a>')
});

app.listen(3000);

