// Módulo 3. Ejercicio opcional p2p
//
// Merge de ficheros. by (jjft)
//
//  by (jjft)  26-05-2015.
//

// Descripción: 
//

// Realizar en JavaScript un programa, de nombre “merge”, que integre n ficheros en uno solo.
// 
// El programa se debe invocar de la siguiente forma
// 
// node merge.js <dest> <f1> <f2> .. <fn>
// 
// El programa debe crear un fichero <dest> concatenando los contenidos de <f1> a <fn>,
// siendo n un número variable de ficheros.


//////////////////////////////////////////////////////


// importa el módulo del sistema de ficheros (file system)

var fs = require('fs');

// closoure para guardar datos que se generan en los eventos de las callbacks de appendFile
// controla los archivos que se van integrando

function countFiles( numFile, nomFile)
	{
	var _numFile = numFile;
	var _nomFile = nomFile;

	function addNumFile()     { ++_numFile;          };
	function addNomFile( nomFile ) { _nomFile += nomFile; };

	function getNumFiles() { return ( _numFile ); };
	function getNomFiles() { return ( _nomFile ); };

	return {  addNumFile : addNumFile,  addNomFile : addNomFile
			 ,getNumFiles: getNumFiles, getNomFiles: getNomFiles };
	}

var count = countFiles( 0, '' );


// node merge <dest> <file1> <file2> <file3> ... <fileN>
// node     = process.argv[ 0 ]
// <dest>   = process.argv[ 1 ]
// <file1>  = process.argv[ 2 ]
// <file2>  = process.argv[ 3 ]
// <file3>  = process.argv[ 4 ]
// ...
// <fileN>  = process.argv[ N+1 ]


// integra varios ficheros en uno solo

function merge( argumentos )
	{
	var msg = '  syntax: node merge <dest> <file1> <file2> <file3> ... <fileN>';

	if ( argumentos.length > 3 )
		{
		msg = '';
		var dest  = argumentos[2];
		var files = argumentos.slice(3);
		// empty destination file
		fs.writeFile( dest, '', function ( err )
									{
									if ( err ) throw err;
									});
		// read each file recursively
		merge1( files, dest, argumentos.length-3, 0 );
		}

	return (msg);
	}


// read recursively all files

function merge1( files, dest, numMax, num)
	{
	// append file while it can
	fs.readFile( files[num]
		    	,function ( err, data )
					{
					if ( err ) 
						{
						console.log( err );
						resum( count.getNumFiles(), count.getNomFiles() );
						}
					else
						{
						// append file to dest
						fs.appendFile( dest
									  ,data
								   	  ,function ( err )
										  {
									  	  if ( err ) throw err;

									  	  count.addNumFile();
										  count.addNomFile( files[num] + ' ' );

									  	  if ( (num+1) < numMax )
									  	  	  merge1( files, dest, numMax, num + 1 );
									  	  else
 									  	  	  resum( count.getNumFiles(), count.getNomFiles() );
										  });
						}
					}
				);
	}


// muestra el resultado de los ficheros integrados
// si en algún momento se lanza un error se mostrará hasta el último fichero integrado

function resum( num, nom )
	{
	console.log( num + ' files merged: ' + nom );
	}


console.log( merge( process.argv ) );

