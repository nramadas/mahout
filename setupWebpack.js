var fs = require('fs');
var colors = require('colors');
var path = require('path');

var chainCb = require('./lib').chainCb;

module.exports = function(next) {
  console.log(colors.yellow('Setting up webpack...'));
  fs.readFile(path.resolve(__dirname, './exampleCompileFile.js'), function(err, blob) {
    if (err) throw err;

    fs.writeFile(path.resolve('./compile.js'), blob, function(err) {
      if (err) throw err;
      next();
    })
  });
}
