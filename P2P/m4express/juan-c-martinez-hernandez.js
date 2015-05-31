var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// CONSTRUIMOS LA PÄGINA CON LOS 2 FORMS
app.get('/preguntas', function (req, res) {
	res.send('<html><body><head><title>Preguntas del millón</title></head>'
			+	'<form method="post" action="/respuesta">' 
			+	'<input type="hidden" name="preg" value="pr1" />'
			+	'¿Quién descubrió América?<br>'
			+	'<input type?"text" name="resp1" />'
			+	'<input type="submit" value="enviar" />'
			+	'</form>'
			+	'<br><br><br><form method="post" action="/respuesta">'
			+	'<input type="hidden" name="preg" value="pr2" />'
			+	'¿Capital de Portugal?<br>'
			+	'<input type?"text" name="resp2" />'
			+	'<input type="submit" value="enviar" />'
			+	'</form>'
			+	'</body></html>');
		}
);

// RESPUESTA
app.post('/respuesta', function (req,res){
	if (req.body.preg === "pr1") { 				// SI ES EL FORM1
		if (req.body.resp1 === "Cristóbal Colón") { // SI RESP = OK
			res.send('<html><head><title>Respuesta</title></head><body>'
				+	'Correcto, premio!!!<br>(Pídeselo a Montoro)<br>'
				+	'<br><a href="/preguntas">Volver a la página 1</a>'
				+	'</body></html>'
				);
		}
		else {										// SI NO OK
			res.send('<html><head><title>Respuesta</title></head><body>'
				+	'La liaste, la respuesta correcta es: Cristóbal Colón<br>'
				+	'(ojo con las mayúculas y las tildes)'
				+	'<br><a href="/preguntas">Volver a la página 1</a>'
				+	'</body></html>'
				);
		}
	}
	if (req.body.preg === "pr2") { 				// SI ES EL FORM2
		if (req.body.resp2 === "Lisboa") { // SI RESP = OK
			res.send('<html><head><title>Respuesta</title></head><body>'
				+	'Correcto, premio!!!<br>(Pídeselo a Montoro)<br>'
				+	'<br><a href="/preguntas">Volver a la página 1</a>'
				+	'</body></html>'
				);
		}
		else {										// SI NO OK
			res.send('<html><head><title>Respuesta</title></head><body>'
				+	'La liaste, la respuesta correcta es: Lisboa<br>'
				+	'(aunque ' + req.body.resp2 + ' también mola)'
				+	'<br><a href="/preguntas">Volver a la página 1</a>'
				+	'</body></html>'
				);
		}
	}
});
console.log("Escuchando en el puerto 8000 (http://localhost:8000/presguntas para conectar)");
app.listen(8000);

