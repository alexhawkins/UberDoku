// Karma configuration
var webpack = require('webpack');
var path = require('path');
var node_modules = path.join(__dirname, 'node_modules');
var data = path.join(__dirname, 'src/app/utils/stores/data/');
module.exports = function(config) {
    config.set({
        // ... normal karma configuration

        files: [
            node_modules + '/jquery/dist/jquery.js',
            __dirname + '/src/app/utils/lodash.min.js',
            node_modules + '/es6-promise/dist/es6-promise.min.js',
            'test/*_test.es6',
            'test/**/*_test.es6'
            // each file acts as entry point for the webpack configuration
        ],

        proxies: {
           '/stores/data/' : 'https://localhost:9876/stores/data/'
        },

        frameworks: ['mocha'],


        browsers: ['Chrome'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        autoWatch: true,
        preprocessors: {
            // add webpack as preprocessor
            'test/stores/data/*.json': ['webpack'],
            'test/*_test.es6': ['webpack'],
            'test/**/*_test.es6': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            output: {
                path: path.join(__dirname, 'dist'),
                publicPath: '/',
                filename: 'app.js',
                chunkFilename: '[chunkhash].js'
            },


            resolve: {
                extensions: ['', '.js', '.es6', '.html', '.scss'],
                packageMains: ["webpack", "browser", "web", "browserify", "main"]
            },


            module: {
                loaders: [{
                    test: /\.es6?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }, {
                    test: /.*\.(gif|png|jpg)$/,
                    loaders: ['file?hash=sha512&digest=hex&size=16&name=[hash].[ext]', 'image-webpack-loader?optimizationLevel=7&interlaced=false']
                }, {
                    test: /\.scss$/,
                    loader: "style!css!sass",
                    exclude: /node_modules/
                }, {
                    test: /\.html$/,
                    loader: 'raw',
                    exclude: /node_modules/
                }]
            }
        },

        resolve: {
            extensions: [
                '',
                '.min.js',
                '.js',
                '.es6',
                '.es6.js',
                '.webpack.js',
                '.web.js',
                '.sass',
                '.scss',
                '.css',
                '.html'
            ],

        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        plugins: [
            require('karma-chrome-launcher'),
            require('karma-mocha'),
            require('karma-webpack')
        ]
    });
};
