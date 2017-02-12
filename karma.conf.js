//karma config
module.exports = function(config) {

  var webpackConfig = require('./config/webpack.test.js')({ env: 'test' });

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    

    files: [
      { pattern: './config/spec-bundle.js', watched: false },
    ],

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },
    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    coverageReporter: {
      type: 'in-memory'
    },

     /*
     * test results reporter to use
     *
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
      reporters: ['coverage', 'mocha', 'remap-coverage'],

      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,

    /*
    * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    */
      browsers: [
        'Chrome'
      ]
  
  });
};