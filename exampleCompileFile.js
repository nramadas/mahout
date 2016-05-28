var webpack = require("webpack");
var argv = require("yargs").argv;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var makeCompiler = function(env) {
  var entry = env === 'production'
    ? { Client: './src/Client.js', }
    : { DevClient: './src/Client.js', };

  return webpack({
    entry: entry,
    output: {
      path: "./bin",
      filename: "[name].js"
    },
    resolve: {
      extensions: [
        "",
        ".js",
        ".jsx",
        ".es6.js",
        ".json"
      ],
      modules: [
        "./src",
        "node_modules"
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel",
          query: {
            presets: [
              "es2015-native-modules",
              "stage-2",
              "react"
            ],
            plugins: [
              "transform-class-properties",
              "transform-react-constant-elements",
              "transform-react-inline-elements",
            ],
          },
        },
        {
          test: /\.json$/,
          loader: "json-loader"
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin('style-loader', 'css-loader'),
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin('style-loader', 'css-loader!less-loader'),
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
    devtool: "source-map"
  });
};

if (argv.watch) {
  makeCompiler('development').watch({}, function(err, stats) {
    if (!err) {
      console.log(stats.toString({
        colors: true,
        chunks: false,
        version: false,
      }));
    } else {
      throw err;
    }
  })
} else {
  makeCompiler('production').run(function(err, stats) {
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
