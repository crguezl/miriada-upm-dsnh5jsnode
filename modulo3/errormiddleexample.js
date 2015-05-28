var express = require('express');
var app = express();

app.get('/user/:id', function(req, res, next){
  if (req.params.id.match(/^(eva|ana)$/i)) {
    res.send('usuario del sistema');
  }
  else {
    next(new Error('usuario desconocido'));
  }
});

app.get('*', function(req,res){
  res.send('operación inválida');
});

app.use(function(err, req, res, next) {
  res.send('Mensaje: '+err.toString());
});

app.listen(3000);
