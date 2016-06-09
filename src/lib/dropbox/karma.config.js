// Karma configuration
// Generated on Tue Jun 07 2016 07:48:29 GMT-0700 (PDT)
var webpack = require('karma-webpack');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      "**/*.spec.js"
    ],
    exclude: [""],
    plugins: [
      webpack,
      'karma-jasmine',
      'karma-safari-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    preprocessors: {
      '**/*.spec.js': ["webpack"]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel' // 'babel-loader' is also a legal name to reference
          }
        ]
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Safari', 'Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  })
};
