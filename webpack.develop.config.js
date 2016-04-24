var webpack = require('webpack');
var path = require('path');

const port = 3000;

const build_entry = {
  app: "./src/index.js",
  vendor: [
    "react",
    "react-dom",
    "./node_modules/regenerator/runtime.js",
    "markdown-it", "markdown-it-highlightjs", "markdown-it-task-lists",
    "rxjs",
    "luna", "luna-saga",
    "brace", "react-ace",
    "lodash"
  ]
};

module.exports = {
  entry: build_entry,
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
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
        // ES6 modules
        test: /luna\-saga\/(.*)\.js$/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['regenerator', 'react-hot', 'babel-loader']
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass']
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
  devServer: {
    port: port,
    contentBase: "./src",
    noInfo: true, //  --no-info option
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new webpack.NoErrorsPlugin()
  ]
};
