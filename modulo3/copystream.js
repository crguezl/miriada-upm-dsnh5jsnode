#!/usr/bin/env node

var fs = require('fs');

if (process.argv.length !== 4) {
  console.log("\tSyntax: node "+process.argv[1]+" source destination");
  process.exit();
}

var source  = fs.createReadStream(process.argv[2]);
var destiny = fs.createWriteStream(process.argv[3]);
destiny.on('close', function() {  process.stdout.write("copy finished\n"); });

source.pipe(destiny);
