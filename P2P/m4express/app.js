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

app.locals.quiz = {
  1: { question: '¿Quién descubrió América?',
       answer: /^\s*(Cristobal\s+)?Col[oó]n\s*$/i, suggest: 'Cristobal Colón'},
  2: { question: '¿Capital de Portugal?',
       answer: /^\s*(Lisboa|Lisbon)\s*$/i, suggest: 'Lisboa' },
  3: { question: '7 * 8 = ?',
       answer: /^\s*(56|cincuenta y seis)\s*$/i, suggest: '7*7 es 49' }
};

function pagina1(res) {
  //res.sendFile(path.join(__dirname, 'preguntas.html'));
  var layout = 
'  <!DOCTYPE html>' + "\n" +
'  <html lang="en">' + "\n" +
'    <head>' + "\n" +
'      <meta charset="UTF-8">' + "\n" +
'      <title>Cuestionario</title>' + "\n" +
'    </head>' + "\n" +
'    <body>' + "\n" +
'        <ol>' + "\n" +
'          preguntas' + "\n" +
'        </ol>' + "\n" +
'      </body>' + "\n" +
'    </html>';

  var pregunta = '', preguntas = '';
  for (var i in app.locals.quiz) {
    pregunta = 
'            <form method="GET" action="/respuesta/' + i + '">' + "\n" +
'              <label for="' + i + '">' + app.locals.quiz[i].question  + '</label>' + "\n" +
'              <input id="' + i + '" name ="' + i + '" type="text" size="40">' + "\n" +
'              <input type="submit" value="submit"><br>' + "\n" +
'            </form>';
    preguntas +=
'          <li>' + "\n" +
'             ' + pregunta 
'          </li>' + "\n";
  }
  res.send(layout.replace(/preguntas/, preguntas));
}

function pagina2(kind, suggest) {
  var answer =
'<!DOCTYPE html>' + "\n" +
'<html lang="en">' + "\n" +
'<head>' + "\n" +
'  <meta charset="UTF-8">' + "\n" +
'  <title>Respuesta</title>' + "\n" +
'</head>' + "\n" +
'<body>' + "\n" +
'  kind' + "\n" +
'  <br>' + "\n" +
'  suggest' + "\n" +
'  <br>' + "\n" +
'  <a href="/preguntas">Volver a la página inicial</a>' + "\n" +
'</body>' + "\n" +
'</html>';
  return answer.replace(/kind/g, kind).replace(/\bsuggest\b/g, suggest);
}

app.get('/preguntas', function(req, res) {
  pagina1(res);
});

app.get('/respuesta/:id', function(req, res, next) {
  var question = req.params.id;
  console.log(question);
  if (question in app.locals.quiz) {
    var answer = req.query[req.params.id];
    if (answer) {
      if (answer.match(app.locals.quiz[question].answer)) {
        res.send(pagina2("¡Correcto!", ""));
      }
      else {
        res.send(pagina2("¡Incorrecto!", "Sugerencia: " + app.locals.quiz[question].suggest));
      }
    } else {
      next(new Error("Especifique una respuesta para la pregunta " + question));
    }
  } else { 
    next(new Error("No existe la pregunta " + question));
  }
});

app.get('*', function(req, res){
  res.redirect('/preguntas');
});

app.use(function(err, req, res, next){
  res.send(pagina2(err.message,''));
});

console.log('App listening on port 3000. Visit http://localhost:3000');
app.listen(3000);
