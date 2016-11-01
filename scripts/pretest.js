var fs = require('fs');
var exec = require('child_process').exec;

var dir = 'test/.src';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

exec('babel src --out-dir "test/.src"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
  }
  console.log(stdout);

  console.log('pretest compilation done');
});