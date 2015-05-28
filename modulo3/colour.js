#!/usr/bin/env node
// http://dailyjs.com/2012/03/08/unix-node-pipes/

var program = require('commander')  
  , c = 90;

program  
  .version('1.0.0')
  .option('-r, --red', 'Red text')
  .option('-g, --green', 'Green text')
  .option('-b, --blue', 'Blue text')
  .parse(process.argv);

function colour(c, str) {  
  return '\033[' + c + 'm' + str + '\033[0m';
}

if (program.red) {  
  c = 91;
} else if (program.green) {
  c = 92;
} else if (program.blue) {
  c = 94;
}

process.stdin.resume();  
process.stdin.setEncoding('utf8');  
process.stdin.on('data', function(data) {  
  process.stdout.write(colour(c, data));
});
