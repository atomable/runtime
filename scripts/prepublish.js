var fs = require('fs');
var exec = require('child_process').exec;

var dir = 'dist';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

exec('babel src --out-dir dist --minified', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
  }
  console.log(stdout);

  console.log('prebublish done');
});