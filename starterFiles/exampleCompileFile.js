var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Uglify = require('webpack/lib/optimize/UglifyJsPlugin');
var Define = require('webpack/lib/DefinePlugin');
var argv = require('yargs').argv;
var config = require('./webpack.config');

if (process.env.NODE_ENV === 'development') {
  config.entry.unshift('webpack/hot/dev-server');
  config.entry.unshift('webpack-dev-server/client?http://localhost:8080/');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  var compiler = webpack(config);
  var server = new WebpackDevServer(compiler, {
    hot: true,
    stats: {
      colors: true,
      chunks: false,
      version: false,
    },
  });
  server.listen(8080);
} else {
  config.plugins.push(new Define({ 'process.env.NODE_ENV': `'production'` }));
  config.plugins.push(new Uglify({ compress: { warnings: false } }));

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
