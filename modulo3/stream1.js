/*
 * In "old" Streams mode the stdin stream is paused by default, 
 * so one must call process.stdin.resume() to read from it. 
 * Note also that calling process.stdin.resume() itself would switch stream to "old" mode.
 * If you are starting a new project you should prefer a more recent "new" 
 * Streams mode over "old" one.
 * See Unix and Node: Pipes and Streams at http://dailyjs.com/2012/03/08/unix-node-pipes/
*/
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(line){
  process.stdout.write(line);
});
