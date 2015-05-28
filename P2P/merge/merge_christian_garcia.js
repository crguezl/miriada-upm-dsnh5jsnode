var fs = require("fs");

if(process.argv.length < 4){
    console.log("   syntax: node merge <dest> <f1> <f2> .. <fn>");
    process.exit();
}

for(var i = 3; i < process.argv.length; i++){
    fs.readFile(process.argv[i],
                function(err, data){
                    fs.appendFile(process.argv[2],
                                 data,
                                 function (err){
                                 if(err) 
                                     throw err;                                 
                                 }
                    );
                }
    );
}
console.log("File merged");
