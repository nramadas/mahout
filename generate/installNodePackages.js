var colors = require('colors');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var chainCb = require('../lib').chainCb;
var makeSpinner = require('../lib').makeSpinner;
var stopSpinner = require('../lib').stopSpinner;

var PACKAGES = {
  WEBPACK: [
    'webpack@2.1.0-beta.7',
    'webpack-dev-server@2.1.0-beta.0',
    'babel-cli',
    'babel-core',
    'babel-loader',
    'babel-plugin-transform-class-properties',
    'babel-plugin-transform-react-constant-elements',
    'babel-plugin-transform-react-inline-elements',
    'babel-plugin-transform-runtime',
    'babel-preset-es2015',
    'babel-preset-es2015-native-modules',
    'babel-preset-react',
    'babel-preset-stage-2',
    'babel-preset-react-hmre',
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
    'nodemon',
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
      PACKAGES.WEBPACK, '-S'],
    [installPackages,
      'Installing testing framework',
      PACKAGES.TESTING, '--save-dev'],
    [installPackages,
      'Installing react',
      PACKAGES.REACT, '-S'],
    [installPackages,
      'Installing koa',
      PACKAGES.SERVER, '-S'],
    [installPackages,
      'Installing libraries',
      PACKAGES.LIB, '-S']
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
