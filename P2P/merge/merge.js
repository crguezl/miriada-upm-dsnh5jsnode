#!/usr/bin/env node
/*
  Realizar en JavaScript un programa, de nombre "merge", que integre
  n ficheros en uno solo.
  El programa se debe invocar de la siguiente forma

              node merge.js <dest> <f1> <f2> .. <fn>

  El programa debe crear un fichero <dest> concatenando los contenidos
  de <f1> a <fn>, siendo n un número variable de ficheros.
*/

var path = require('path');
var fs = require('fs');

var args = process.argv.slice(2);
if (args.length < 2) {
  console.log("\tSyntax is: node " +
              path.basename(process.argv[1]) + 
              " destination source1 source 2 ...");
  process.exit();
}
var dest = fs.createWriteStream(args.shift());
args.forEach(function (fn) {
  var source  = fs.createReadStream(fn);
  // http://stackoverflow.com/questions/21771220/error-handling-with-node-js-streams
  source.on('error', function (err) {
    console.log(fn + " not found!");
  }).pipe(dest);
});

