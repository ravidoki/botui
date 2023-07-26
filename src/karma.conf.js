// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter')
    ],
    chromeDriver: '/usr/bin/chromedriver',
    parallelOptions: {
      executors: require('os') ? Math.ceil(require('os').cpus().length / 2) : 1,
      shardStrategy: 'round-robin'
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/ayuv'),
      reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
      fixWebpackSourcePaths: true
    },

    reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'junit'],
    junitReporter: {
      outputDir: '../junit'
    },
    port: 9876,
    colors: true,
    logLevel: config.INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    browserNoActivityTimeout: 120000,
    singleRun: false
  });
};
