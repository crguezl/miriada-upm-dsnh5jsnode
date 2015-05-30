/*
Construir una aplicación de servidor con express que tenga 2 páginas
diferentes, enlazadas entre sí con el siguiente comportamiento:

Página 1: Será la página de entrada de la aplicación y tendrá un
título y 2 preguntas: ¿Quién descubrió América? y ¿Capital de Portugal?. 

Cada pregunta tendrá un formulario asociado, con un
cajetín de entrada y un botón de envío, que permitirá enviar la
respuesta a esa pregunta en particular (es decir habrá 2 formularios
en la página). 

Cada formulario tendrá además un parámetro oculto
que envíe un valor diferente que indique al servidor a que pregunta
está contestando el cliente.

La página 1 estará asociada a la transacción HTTP:  GET /preguntas

Página 2: Será la página que muestre la respuesta a la que está
contestando el cliente , e indicará si ha contestado correctamente
o no con una frase correctamente construida. En caso de contestar
incorrectamente, le indicará además cual es la respuesta correcta.
La página incluirá además un enlace asociado al texto “Volver a la
página inicial”, que permita volver a la página 1.

La página 2 estará asociada a la transacción HTTP:  GET /respuesta
*/

var path = require('path');
var express = require('express');
var app = express();

app.locals.answers = {
  1: { answer: /^\s*(Cristobal\s+)?Col[oó]n\s*$/i, suggest: 'Cristobal Colón'},
  2: { answer: /^\s*(Lisboa|Lisbon)\s*$/i, suggest: 'Lisboa' }
};

function pagina1(res) {
  //res.sendFile(path.join(__dirname, 'preguntas.html'));
  res.send(
'  <!DOCTYPE html>' + "\n" +
'  <html lang="en">' + "\n" +
'    <head>' + "\n" +
'      <meta charset="UTF-8">' + "\n" +
'      <title>Cuestionario</title>' + "\n" +
'    </head>' + "\n" +
'    <body>' + "\n" +
'        <ol>' + "\n" +
'          <li>' + "\n" +
'            <form method="GET" action="/respuesta/1">' + "\n" +
'              <label for="1">¿Quién descubrió América?</label>' + "\n" +
'              <input id="1" name ="1" type="text" size="40">' + "\n" +
'              <input type="submit" value="submit"><br>' + "\n" +
'            </form>' + "\n" +
'          </li>' + "\n" +
'          <li>' + "\n" +
'            <form method="GET" action="/respuesta/2">' + "\n" +
'              <label for="2">¿Capital de Portugal?</label>' + "\n" +
'              <input id="2" name ="2" type="text" size="40">' + "\n" +
'              <input type="submit" value="submit"><br>' + "\n" +
'            </form>' + "\n" +
'          </li>' + "\n" +
'        </ol>' + "\n" +
'      </body>' + "\n" +
'    </html>'
  );
}

function pagina2(kind, suggest) {
  return kind +
    " <br> "  +
    suggest   +
    '<br>'    +
    '<a href="/preguntas">Volver a la página inicial</a>';
}

app.get('/preguntas', function(req, res) {
  pagina1(res);
});

app.get('/respuesta/:id', function(req, res, next) {
  var question = req.params.id;
  if (question in app.locals.answers) {
    var answer = req.query[req.params.id];
    if (answer) {
      if (answer.match(app.locals.answers[question].answer)) {
        res.send(pagina2("¡Correcto!", ""));
      }
      else {
        res.send(pagina2("¡Incorrecto!", "La respuesta correcta es: "+app.locals.answers[question].suggest));
      }
    } else {
      next(new Error("Especifique una respuesta para la pregunta "+question));
    }
  } else { 
    next(new Error("No existe la pregunta "+question));
  }
});

app.get('*', function(req, res){
  res.redirect('/preguntas');
});

app.use(function(err, req, res, next){
  res.send(pagina2(err.toString()));
});

console.log('App listening on port 3000. Visit http://localhost:3000');
app.listen(3000);
