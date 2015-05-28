var fs = require('fs');

process.on("ENOENT",function(err){
    console.log("error lecura fichero");
});

if (process.argv.length < 4){
	console.log("El merge tiene que tener como minimo 4 argumentos");
	console.log("<node> <nombre_programa> <nombre_fichero_salida> <fichero1> ... <fichero n>");
	process.exit();
}

var writeStream = fs.createWriteStream(process.argv[2]);
var readStream = null;


    for (var i=3;i<process.argv.length;i++) {
        readStream = fs.createReadStream(process.argv[i]);
        //Capturamos el error que pueda ocurrir al no existir un fichero de a leer de la lista
        //manteniendo la escritura de todos los demas
        readStream.on('error', function (err) {
            console.log("error Capturado en lectura fichero: \n"+err+"\n El fichero no será incluido en: "+process.argv[2]);
        });
        readStream.pipe(writeStream);
    }




