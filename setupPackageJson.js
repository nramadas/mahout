var fs = require('fs');
var colors = require('colors');

var log = require('./lib').log;
var prompt = require('./lib').prompt;
var chainCb = require('./lib').chainCb;

var PACKAGE_JSON = {
  version: '0.0.1',
  main: 'index.js',
  scripts: {
    build: 'node compile.js',
    watch: 'npm run build -- --watch',
    'build:prod': 'npm run build -- --prod',
    start: 'node ./bin/Server.js',
    'start:dev': 'node ./bin/DevServer.js',
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
    [prompt, '    Name your project: ',function(val) {
      packageJson.name = val;
    }],
    [prompt, '          Description: ', function(val) {
      packageJson.description = val;
    }],
    [prompt, '       Git repository: ', function(val) {
      packageJson.repository.url = 'git+' + val;
      packageJson.bugs.url = val.replace('.git', '/issues');
      packageJson.homepage = val.replace('.git', '#readme');
    }],
    [prompt, '               Author: ', function(val) {
      packageJson.author = val;
    }],
    [prompt, '              License: ', function(val) {
      packageJson.license = val;
    }],
  ], function() {
    console.log('');
    next(packageJson);
  });
};

var writePackageJson = function(dict, next) {
  console.log(colors.yellow('Creating package.json...'));

  fs.writeFile('package.json', JSON.stringify(dict, null, 2), (err) => {
    if (err) throw err;
    next();
  });
};

module.exports = function(next) {
  chainCb([
    [getPackageJsonValues],
    [writePackageJson],
  ], next);
};
