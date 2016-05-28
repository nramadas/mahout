var colors = require('colors');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var chainCb = require('./lib').chainCb;
var makeSpinner = require('./lib').makeSpinner;
var stopSpinner = require('./lib').stopSpinner;

var PACKAGES = {
  WEBPACK: [
    'webpack@2.1.0-beta.7',
    'babel-core',
    'babel-loader',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-react-constant-elements',
    'babel-plugin-transform-react-inline-elements',
    'babel-preset-es2015-native-modules',
    'babel-preset-react',
    'babel-preset-stage-2',
    'css-loader',
    'extract-text-webpack-plugin',
    'ignore-loader',
    'json-loader',
    'less',
    'less-loader',
    'postcss-loader',
    'style-loader',
    'yargs',
  ],
  REACT: [
    'react@15',
    'react-dom@15',
    'redux',
    'react-redux',
    'reselect',
  ],
  TESTING: [
    'mocha',
    'chai',
    'sinon',
    'enzyme',
    'sinon-chai',
    'chai-enzyme',
    'react-addons-test-utils',
  ],
  SERVER: [
    'koa@2',
    'koa-bodyparser@3',
    'koa-router@7',
    'koa-static@3',
  ],
  LIB: [
    'lodash@3',
    'webfonts-generator',
  ],
};

var cleanNodeModules = function(next) {
  var spinner = makeSpinner(' %s ' + colors.white('Cleaning old node packages'));

  rimraf('./node_modules', {}, function() {
    stopSpinner(spinner);
    next();
  });
};

var installPackages = function(title, packages, flag, next) {
  var command = 'npm install ' + flag + ' ' + packages.join(' ');
  var spinner = makeSpinner(' %s ' + colors.white(title));

  var installation = exec(command, function(err, stdout, stderr) {
    stopSpinner(spinner);
    if (err) throw err;
    // console.log(String(stdout));
    // console.log(colors.red(String(stderr)));
    next();
  });
};

var installAllPackages = function(next) {
  console.log(colors.yellow('Installing node packages:'));
  chainCb([
    [cleanNodeModules],
    [installPackages,
      'Installing transpilation tooling',
      PACKAGES.WEBPACK, '--save-dev'],
    [installPackages,
      'Installing testing framework',
      PACKAGES.TESTING, '--save-dev'],
    [installPackages,
      'Installing react',
      PACKAGES.REACT, '--save'],
    [installPackages,
      'Installing koa',
      PACKAGES.SERVER, '--save'],
    [installPackages,
      'Installing libraries',
      PACKAGES.LIB, '--save']
  ], next);
};

module.exports = function(next) {
  chainCb([
    [installAllPackages]
  ], function() {
    console.log('');
    next();
  });
}
