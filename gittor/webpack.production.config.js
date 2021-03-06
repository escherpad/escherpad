const build_entry = {
  app: "./src/index.js",
  vendor: [
    "react",
    "react-dom",
    "radium",
    "./node_modules/regenerator-runtime/runtime.js",
    "markdown-it", "markdown-it-highlightjs", "markdown-it-task-lists",
    "rxjs",
    "luna", "luna-saga",
    "brace", "lodash.debounce", "lodash.throttle"
  ]
};

'use strict';

var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: build_entry,
  output: {
    path: path.join(__dirname, 'gittor'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [
      /autoit\.js$/
    ],
    loaders: [
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        loader: "file?[name].[ext]"
      },
      {
        // remove the source-map urls from the rxjs library.
        test: /rxjs\/(.*)\.js$/,
        loaders: ['source-map']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['regenerator', 'babel-loader']
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', "postcss-loader", 'sass']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url?prefix=font/&limit=5000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.gif/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
        test: /\.png/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
    new CopyWebpackPlugin([
      {from: 'src/index.html'},
      {from: 'src/oauth', to: 'oauth'}
    ]),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
  ]
};
