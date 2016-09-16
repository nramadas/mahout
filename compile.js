var webpack = require('webpack');
var argv = require('yargs').argv;
var config = require('./webpack.config');

if (argv.watch) {
  var compiler = webpack(config);
  compiler.watch({}, function(err, stats) {
    console.log(stats.toString({
      colors: true,
      chunks: false,
      version: false,
    }));
  });
} else {
  webpack(config).run(function(err, stats) {
    if (!err) {
      console.log(stats.toString({
        colors: false,
        chunks: false,
        version: false,
      }));
    } else {
      throw err;
    }
  });
}
