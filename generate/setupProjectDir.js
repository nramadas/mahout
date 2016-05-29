var colors = require('colors');

var chainCb = require('../lib').chainCb;
var copyFile = require('../lib').copyFile;
var makeFile = require('../lib').makeFile;
var makeDir = require('../lib').makeDir;

var createDirs = function(next) {
  console.log(colors.yellow('Creating project directories:'));

  chainCb([
    [makeDir, 'src'],
    [makeDir, 'src/app'],
    [makeDir, 'src/app/actions'],
    [makeDir, 'src/app/components'],
    [makeDir, 'src/app/helpers'],
    [makeDir, 'src/app/reducers'],
    [makeDir, 'src/client'],
    [makeDir, 'src/server'],
    [makeDir, 'src/server/templates'],
  ], function() {
    console.log('');
    next();
  });
};

var createFiles = function(next) {
  console.log(colors.yellow('Creating base files:'));

  chainCb([
    [copyFile, 'starterFiles/exampleClient.js', 'src/client/index.jsx'],
    [copyFile, 'starterFiles/exampleServer.js', 'src/server/index.jsx'],
    [copyFile, 'starterFiles/exampleTemplate.js', 'src/server/templates/main.jsx'],
    [copyFile, 'starterFiles/exampleApp.js', 'src/app/index.jsx'],
    [makeFile, 'src/app/index.less', ''],
    [copyFile, 'starterFiles/exampleNormalize.css', 'src/app/normalize.css'],
    [copyFile, 'starterFiles/exampleReducers.js', 'src/app/reducers/index.js'],
    [copyFile, 'starterFiles/exampleGitignore', '.gitignore'],
  ], function() {
    console.log('');
    next();
  });
};

module.exports = function(next) {
  chainCb([
    [createDirs],
    [createFiles],
  ], next);
};
