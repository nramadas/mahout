var chainCb = require('./lib').chainCb;
var setupPackageJson = require('./setupPackageJson');
var installNodePackages = require('./installNodePackages');
var setupProjectDir = require('./setupProjectDir');
var setupWebpack = require('./setupWebpack');

module.exports = function(next) {
  chainCb([
    [setupPackageJson],
    [installNodePackages],
    [setupProjectDir],
    [setupWebpack],
  ], next);
};
