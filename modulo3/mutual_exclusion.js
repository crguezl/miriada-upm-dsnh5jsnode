var tiempo = 6000;

function doIt(name) {
  tiempo = tiempo - 1000;
  console.log(name+" consume 1000. tiempo = "+tiempo);
  if (tiempo < 1) process.exit();
}

setInterval(function() { doIt('A') },1000);
setInterval(function() { doIt('B') },1000);
