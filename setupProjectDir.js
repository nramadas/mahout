var colors = require('colors');
var fs = require('fs');
var path = require('path');

var chainCb = require('./lib').chainCb;

var makeDir = function(dir, next) {
  var target = './' + dir;

  fs.exists(target, function(err, exists) {
    if (err) throw err;

    if (exists) {
      console.log(colors.green(' ✓ ') + colors.white('creating ' + dir));
      next();
    } else {
      fs.mkdir(target, function(err) {
        if (err) throw err;
        console.log(colors.green(' ✓ ') + colors.white('creating ' + dir));
        next();
      });
    }
  });
};

var makeFile = function(file, next) {
  fs.writeFile('./' + file, '', function(err) {
    if (err) throw err;

    console.log(colors.green(' ✓ ') + colors.white('creating ' + file));
    next();
  });
};

var copyFile = function(file, dest, next) {
  fs.readFile(path.resolve(__dirname, file), function(err, blob) {
    if (err) throw err;

    fs.writeFile('./' + dest, blob, function(err) {
      if (err) throw err;
      console.log(colors.green(' ✓ ') + colors.white('creating ' + dest));
      next();
    });
  });
};

var createDirs = function(next) {
  console.log(colors.yellow('Creating project directories:'));

  chainCb([
    [makeDir, 'src'],
    [makeDir, 'src/app'],
    [makeDir, 'src/app/actions'],
    [makeDir, 'src/app/components'],
    [makeDir, 'src/app/helpers'],
    [makeDir, 'src/app/reducers'],
    [makeDir, 'src/server'],
    [makeDir, 'src/templates'],
  ], function() {
    console.log('');
    next();
  });
};

var createFiles = function(next) {
  console.log(colors.yellow('Creating base files:'));

  chainCb([
    [makeFile, 'src/Client.js'],
    [makeFile, 'src/Server.js'],
    [copyFile, './exampleTemplate.js', 'src/templates/main.jsx'],
    [copyFile, './exampleApp.js', 'src/app/App.jsx'],
    [makeFile, 'src/app/App.less'],
    [copyFile, './exampleNormalize.css', 'src/app/normalize.css'],
    [makeFile, 'src/app/reducers/index.js'],
    [copyFile, './exampleGitignore', '.gitignore'],
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
