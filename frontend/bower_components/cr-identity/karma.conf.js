module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        "bower_components/angular/angular.js",
        "bower_components/angular-mocks/angular-mocks.js",
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        "bower_components/cr-acl/cr-acl.js",
        "bower_components/cr-session/cr-session.js",
        "cr-identity.js",
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
