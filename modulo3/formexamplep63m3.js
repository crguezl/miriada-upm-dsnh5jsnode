var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send(
'<!DOCTYPE HTML>'+
'<html lang="en">'+
'<head>'+
'  <meta charset="UTF-8">'+
'  <title>Form Example</title>'+
'</head>'+
'  <body>'+
'    <form method="get" action="/process">'+
'      Su nombre:'+
'      <input type="text" name="user" value="Teclee su nombre" autofocus/>'+
'      <br />'+
'      <input type="submit" value="Enviar"/>'+
'    </form>'+
'  </body>'+
'</html>'
  );
});

app.get('/process', function(req, res) {
  res.send('Hola '+req.query.user+'<br/> <a href="/">back</a>')
});

app.listen(3000);

