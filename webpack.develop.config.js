var webpack = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

const port = 4000;

const build_entry = {
  app: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill',
    "./src/index.js"
  ],
  vendor: [
    "react",
    "react-dom",
    "radium",
    "markdown-it", "markdown-it-highlightjs", "markdown-it-task-lists",
    "rxjs",
    "luna", "luna-saga",
    "brace", "lodash.debounce", "lodash.throttle",
    "moment"
  ]
};

module.exports = {
  entry: build_entry,
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: '/gittor/', //path.join(__dirname, 'gittor'),
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
        loaders: ['babel-loader']
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
  devServer: {
    port: port,
    stats: {colors: true},
    contentBase: "./src",
    noInfo: true, //  --no-info option
    hot: true,
    inline: true,
    historyApiFallback: {
      index: "/index.html"
    },
    proxy: {
      "/gittor/*": {
        target: {
          "host": "localhost",
          "protocol": 'http:',
          "port": 4000
        },
        rewrite: function (req) {
          req.url = req.url.replace(/^\/gittor\//, "/");
          if (req.url.match(/\/$/)) req.url += "index.html";
          var extension = req.url
            .split('/').slice(-1)[0]
            .split('.')[1];
          if (!extension) req.url += ".html";
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    new webpack.NoErrorsPlugin()
  ]
};
