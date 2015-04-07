var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_modules = path.join(__dirname, 'node_modules');
var lowdash = path.join(__dirname + '/src/app/utils/lodash.min.js');

var config = {

    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(path);
    },
    context: __dirname,
    devServer: {
        contentBase: 'public',
        stats: {
            colors: true,
            reasons: true
        }
    },
    devtool: 'eval',
    debug: true,
    cache: false,
    prerender: false,

    entry: {
        app: ['./src/app/app.module.es6'],
        vendor: ['jquery', 'lodash', 'es6-promise']
    },

    output: {
        path: process.env.NODE_ENV === 'production' ? './dist' : './public',
        filename: '[name].js' + (this.longTermCaching ? '?[chunkhash]' : ''),
        chunkFilename: (this.devServer ? '[id].js' : '[name].js') + (this.longTermCaching ? '?[chunkhash]' : ''),

        //sourceMapFilename: 'uberdoku.bundle.js.map',
        publicPath: '/public/',
        sourceMapFilename: 'debugging/[file].map',
        libraryTarget: this.prerender ? 'commonjs2' : undefined,
        pathinfo: this.debug
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js', {
            minChunks: Infinity
        }),
        new ExtractTextPlugin('uberdoku.bundle.css'),
        // , {
        //     //allChunks: true
        // }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        })
    ],


    module: {
        noParse: [],
        preLoaders: [{
            test: /\.es6$/, // include .js files
            exclude: [/node_modules/, /lowdash/], // exclude any and all files in the node_modules folder
            loader: 'jshint-loader'
        }],
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?includePaths[]=' + path.resolve(__dirname, './src/aap')),
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'raw',
                exclude: /node_modules/
            }, {
                test: /index[a-z-]*\.html$/,
                loader: 'file-loader?name=[path][name].html&context=./src',
                exclude: /node_modules/
            },
            // Copy all assets in to asset folder (use hash filename)
            {
                test: /\.(png|jpg|gif|woff|eot|ttf|svg)$/,
                loader: 'file-loader?name=assets/[hash].[ext]',
                exclude: /node_modules/
            }, {
                test: /fonts\/.+\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'raw-loader'
            },
        ]
    },
    resolve: {
        alias: {
            'jquery': node_modules + 'jquery/dist/jquery.min.js',
            'lodash': __dirname + '/src/app/utils/lodash.min.js',
            'es6-promise': node_modules + '/es6-promise/dist/es6-promise.min.js'
        },
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
        modulesDirectories: ['web_modules', 'node_modules']
    }

};

config.addVendor('jquery', path.resolve(node_modules, 'jquery/dist/jquery.min.js'));
config.addVendor('lodash', __dirname + '/src/app/utils/lodash.min.js');
config.addVendor('es6-promise', node_modules + '/es6-promise/dist/es6-promise.min.js');


if (config.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js' + (config.longTermCaching && !config.prerender ? '?[chunkhash]' : '')));
}

if (config.separateStylesheet && !config.prerender) {
    plugins.push(new ExtractTextPlugin('[name].css' + (config.longTermCaching ? '?[contenthash]' : '')));
}

if (process.env.NODE_ENV === 'hot-dev') {
    config.devServer = true;
    config.js = true;
    config.devtool = 'eval';
    config.debug = true;
}

if (process.env.NODE_ENV === 'production') {
    config.longTermCaching = true;
    config.separateStylesheet = true;
    config.minimize = true;
    // devtool: 'source-map'
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    );
}
module.exports = config;
