var webpack = require('webpack');
var path = require('path');

const port = 3000;

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:' + port, // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './node_modules/regenerator/runtime.js', // required for using regenerator.
    './src/index.js', // Your appʼs entry point
    './src/index.html',
    "./src/index.scss"
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
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
  }
  //plugins: [
  //  new webpack.NoErrorsPlugin()
  //]
};
