var express = require('express');
var app = express();
//URL de acceso a la aplicación: //http://localhost:8000/preguntas
//Transacción 1: carga del formulario
app.get('/preguntas', function (req,res){
res.send('<html><head><title>Cuestionario</title></head><body>'
			+ '<form method="get" action="/respuesta">'
			+ '¿Qien decubrió América?<br>'
			+'<input type="hidden" name="id" value="1" /><br>'
			+'<input type="text" name="user1" /><br>'
			+'<input type="submit" values="Enviar" />'
			+'</form><br>'
			+ '<form method="get" action="/respuesta2">'
			+ '¿Capital de Portugal?<br>'
			+'<input type="hidden" name="id" value="2" /><br>'
			+'<input type="text" name="user2" /><br>'
			+'<input type="submit" values="Enviar" />'
			+'</form><br>'
			+'</html></body>');
});
//Transacción 2: procesado formulario y respuesta
app.get('/respuesta',function(req, res){
	//if (req.query.user1==='Cristóbal Colón')
	if (req.query.id==='1'&& req.query.user1==='Cristóbal Colón')
	{res.send(
				'<html><body>'
			+'<h1>Respuesta Correcta</h1><br>'
			+' <a href="http://localhost:8000/preguntas/">Volver a la página inicial</a> '
			+'</html></body>');}
	else{res.send(
				'<html><body>'
			+'<h1>¡Error! La respuesta correcta es Cristóbal Colón</h1><br>'
			+' <a href="http://localhost:8000/preguntas/">Volver a la página inicial</a> '
			+'</html></body>');}
		});

app.get('/respuesta2',function(req, res){
	//if (req.query.user2==='Lisboa')
	if (req.query.id==='2'&& req.query.user2==='Lisboa')
	{res.send(
				'<html><body>'
			+'<h1>Respuesta Correcta</h1><br>'
			+' <a href="http://localhost:8000/preguntas/">Volver a la página inicial</a> '
			+'</html></body>');}
	else{res.send(
				'<html><body>'
			+'<h1>¡Error! La respuesta correcta es Lisboa</h1><br>'
			+' <a href="http://localhost:8000/preguntas/">Volver a la página inicial</a> '
			+'</html></body>');}

	});
app.listen(8000);
