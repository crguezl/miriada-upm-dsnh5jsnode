var express = require('express');
var app = express();
app.get('/:id1(\\d+)/:id2?', function (req,res){
  res.send( req.params.id1 + (req.params.id2 || ""));
});
app.get('*', function (req, res){res.send( 'Nadie' );});
app.listen(3000);
