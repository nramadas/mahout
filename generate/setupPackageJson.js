var fs = require('fs');
var colors = require('colors');

var log = require('../lib').log;
var prompt = require('../lib').prompt;
var chainCb = require('../lib').chainCb;
var makeFile = require('../lib').makeFile;

var PACKAGE_JSON = {
  version: '0.0.1',
  main: 'index.js',
  scripts: {
    build: 'NODE_ENV=production node compile.js',
    'build:watch': 'NODE_ENV=development node compile.js',
    'build:watch-server': 'NODE_ENV=server ./node_modules/.bin/babel ./src/server --out-dir build --source-maps inline --watch',
    start: 'node ./build/index.js',
    'start:dev': 'NODE_ENV=development ./node_modules/.bin/nodemon ./build/index.js',
    test: '',
    fonts: '',
  },
  repository: {
    type: 'git',
  },
  bugs: {},
  engines: {
    node: '>= 4.1.0',
  },
};

var getPackageJsonValues = function(next) {
  console.log(colors.yellow('Let\'s get some details:'));
  var packageJson = PACKAGE_JSON;

  chainCb([
    [prompt, colors.white('    Name your project: '), function(val) {
      packageJson.name = val;
    }],
    [prompt, colors.white('          Description: '), function(val) {
      packageJson.description = val;
    }],
    [prompt, colors.white('       Git repository: '), function(val) {
      packageJson.repository.url = 'git+' + val;
      packageJson.bugs.url = val.replace('.git', '/issues');
      packageJson.homepage = val.replace('.git', '#readme');
    }],
    [prompt, colors.white('               Author: '), function(val) {
      packageJson.author = val;
    }],
    [prompt, colors.white('              License: '), function(val) {
      packageJson.license = val;
    }],
  ], function() {
    console.log('');
    next(packageJson);
  });
};

var writePackageJson = function(dict, next) {
  console.log(colors.yellow('Initializing project:'));

  makeFile('package.json', JSON.stringify(dict, null, 2), function() {
    console.log('');
    next();
  });
};

module.exports = function(next) {
  chainCb([
    [getPackageJsonValues],
    [writePackageJson],
  ], next);
};
