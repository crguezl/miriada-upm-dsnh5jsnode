#!/usr/bin/env node

process.stdin.on('data', function(data) {  
  console.log('Received data:', data);
});

process.stdin.resume();
process.stdin.pipe(process.stdout);  

