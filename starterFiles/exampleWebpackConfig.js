var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');

module.exports = {
  entry: [path.resolve('./src/client/index.jsx')],
  output: {
    path: path.resolve('./bin'),
    filename: 'client.js'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.es6.js',
      '.json',
    ],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 3 versions'],
    }),
  ],
  devtool: 'source-map'
};
