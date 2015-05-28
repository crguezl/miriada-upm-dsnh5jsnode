function agenda (titulo, inic) {
  var _titulo = titulo;
  var _contenido = inic;
 
  return {
    titulo: function()           { return _titulo; },
    meter:  function(nombre, tf) { _contenido[nombre]=tf; },
    tf:     function(nombre)     { return _contenido[nombre]; },
    borrar: function(nombre)     { delete _contenido[nombre]; },
    toJSON: function()           { return JSON.stringify(_contenido);},
    listar: function() { 
      // Si el enunciado tiene una errata entonces:
      for (var i in _contenido) {
        console.log(i + "," + _contenido[i]);
      }
      // Considerando que el enunciado no tiene errata: 
      // var props = Object.keys(_contenido);
      // var last = props[props.length - 1];
      // for (var i in _contenido) {
      //   console.log(i + (i == last? ":" : ",") + _contenido[i]);
      // }
    }
  }
}

var amigos = agenda ("Amigos",
             { Pepe: 113278561,
               José: 157845123,
               Jesús: 178512355
             });

amigos.listar();

