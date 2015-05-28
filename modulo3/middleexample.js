var express = require('express');
var app = express();

app.get('/user/:id', function(req,res,next) {
  if (req.params.id === 'ana' || req.params.id === 'eva') {
    res.send('usuario del sistema');
  }
  else next();
});

app.get('*', function(req, res){
  res.send('usuario desconocido');
});

app.listen(3000);
