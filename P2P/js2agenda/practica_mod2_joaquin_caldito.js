 function agenda (titulo, inic) {
  var _titulo = titulo;
  var _contenido = inic;
 
  return {
    titulo: function()            { return _titulo; },
    meter:  function(nombre, tf)  { _contenido[nombre]=tf; },
    tf:     function(nombre)      { return _contenido[nombre]; },
    borrar: function(nombre)      { delete _contenido[nombre]; },
    toJSON: function()            { return JSON.stringify(_contenido);},
    listar: function()            { return this.toJSON().replace(/,/g," \n").replace(/:/g,", ").replace(/["{}]/g,"");}          
  }
}

var amigos = agenda ("Amigos",
             { Pepe: 113278561,
               Jose: 157845123,
               Jesus: 178512355
             });

console.log('Agenda:                   ' + amigos.titulo());
console.log('Telefono de Pepe          ' + amigos.tf("Pepe"));
console.log('Json                      ' + amigos.toJSON());
console.log('Listar:\n' + amigos.listar()); 