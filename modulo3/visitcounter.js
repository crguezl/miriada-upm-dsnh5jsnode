var express = require('express');
var app = express();

app.locals.counter = 0;

app.use(function(req, res, next) {
  app.locals.counter += 1;
  console.log(req.path);
  console.log(app.locals.counter);
  next();
});

app.get('*', function(req, res){
  res.send("Number of visits: "+app.locals.counter);
});

app.listen(3000);
