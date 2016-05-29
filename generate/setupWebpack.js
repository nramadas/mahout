var colors = require('colors');

var chainCb = require('../lib').chainCb;
var copyFile = require('../lib').copyFile;

module.exports = function(next) {
  console.log(colors.yellow('Setting up webpack:'));

  chainCb([
    [copyFile, 'starterFiles/exampleCompileFile.js', 'compile.js'],
    [copyFile, 'starterFiles/exampleWebpackConfig.js', 'webpack.config.js'],
    [copyFile, 'starterFiles/exampleBabelRC', '.babelrc'],
  ], function() {
    console.log('');
    next();
  });
};
