module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        "bower_components/angular/angular.js",
        "bower_components/angular-mocks/angular-mocks.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-loading-bar/build/loading-bar.js",
        "./cr-loading.js",
        "./spec/*.js"
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
