setTimeout(function() { console.log('Evento A: 2ms'); }, 2);
setTimeout(function() { console.log('Evento B: 0ms'); }, 0);

process.nextTick(function() { console.log("Tick D"); });
process.nextTick(function() { console.log("Tick E"); });

console.log("Fin del programa");
