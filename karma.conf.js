module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['browserify', 'jasmine'],
        files: ['test/unit/**/*.js'],
        reporters: ['spec'],
        preprocessors: {
            'test/unit/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            // needed to enable mocks
            plugin: [require('proxyquireify').plugin]
        },
        singleRun: true
    })
};
