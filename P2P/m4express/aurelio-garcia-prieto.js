console.log('***********************************************');
console.log('* Ejercicio del Módulo 4 del curso de Nodejs. *');
console.log('***********************************************\n');

console.log('Cargando la aplicación...');

var express = require('express');
var path = require('path');
var os = require("os");
var port = process.env.port || 8000;


var app = express();

// Proceso de respuesta a las llamadas GET de la página principal: "/preguntas"
app.get(/^\/$|\/preguntas$/, function (req, res) {
    res.send('<html><head><title>Preguntas</title></head><body>'
        + '<h1>Dudas transcendentales</h1>' 
        + '<form method="get" action="/respuesta">'
        + '<input type="hidden" name="pregunta" value="1"/>' 
        + '<label for="respuesta_1">¿Quién descubrió América?</label><br/>' 
        + '<input id="respuesta_1" type="text" name="respuesta"/><br/>' 
        + '<input type="submit" value="Enviar respuesta"/>' 
        + '</form>'
        + '<form method="get" action="/respuesta">' 
        + '<input type="hidden" name="pregunta" value="2"/>' 
        + '<label for="respuesta_2">¿Capital de Portugal?</label><br/>' 
        + '<input id="respuesta_2" type="text" name="respuesta"/><br/>'
        + '<input type="submit" value="Enviar respuesta"/>' 
        + '</form>'
        + '</body></html>'
    );
});

// Proceso de respuesta a las llamadas GET de los formularios: "/respuesta"
app.get('/respuesta', function (req, res) {
    var pregunta = req.query.pregunta;
    var respuesta = (req.query.respuesta ||'');
    var contestacion = '';
    switch (pregunta) {
        case '1':
            if (respuesta.toLowerCase() === 'cristóbal colón' || respuesta.toLowerCase() == 'colón') {
                contestacion = '¡Enhorabuena!<br/La respuesta es correcta.';
            } else {
                contestacion = '¡Casi!<br/>América fue descubierta el 12 de octubre de 1492 por <b>Cristóbal Colón</b>.';
            }
            break;
        case '2':
            if (respuesta.toLowerCase() === 'lisboa') {
                contestacion = '¡Enhorabuena!<br/La respuesta es correcta.';
            } else {
                contestacion = '¡Casi!<br/>La capital de Portugal es <b>Lisboa</b>';
            }
            break;
        default:
            contestacion = 'No entiendo la pregunta.'
            break
    }

    res.send('<html><head><title>Respuesta</title></head><body>' 
        + '<h1>Respuesta transcendental</h1>' 
        + '<p>' + contestacion + '</p>' 
        + '<a href="/preguntas">Volver a la página inicial</a>' 
        + '</body></html>'
    );

});

// Proceso de respuesta a las llamadas GET de las direcciones no implementadas: "/*"
app.get('*', function (req, res) {
    res.status(404);
    
    if (req.accepts('html')) {
        res.send('<html><head><title>Error</title></head><body>' 
        + '<h1>Error: 404 - Not found</h1>' 
        + '<p>La dirección: "' + req.url + '" no se encuentra en el servidor.</p>' 
        + '<a href="/preguntas">Ir a la página inicial</a>' 
        + '</body></html>'
        );
    }
    else if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    } else {
        res.type('txt').send('Not found');
    }
    });
console.log('...aplicación cargada correctamente.\n');

console.log('Abriendo un puerto para el servicio...');
app.listen(port);
console.log('...puerto abierto correctamente.\n');

console.log('Ahora la aplicación está accesible en la dirección: http://' + os.hostname() + ':' + port);

// Cierra la aplicación al pulsar cualquier tecla
console.log('\nPulse cualquier tecla para cerrar la aplicación...');
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));
