var Util = require('util');
var QS = require('querystring');
var z = QS.stringify({ a: 'maño', b: "?#!"});
console.log(z);
var w = QS.parse(z);
console.log(Util.inspect(w));
