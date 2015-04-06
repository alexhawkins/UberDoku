var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.join(__dirname, 'node_modules');

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
    devtool: 'source-map',
    debug: true,
    cache: false,


    entry: {
        app: ["./src/app/app.module.es6"],
        vendor: ['jquery', 'lodash', 'es6-promise']
    },

    output: {
        path: process.env.NODE_ENV === 'production' ? './dist' : './public',
        filename: 'uberdoku.bundle.js',
        //sourceMapFilename: 'uberdoku.bundle.js.map',
        publicPath: '/public/'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js', {
            minChunks: Infinity
        }),
        new ExtractTextPlugin("uberdoku.bundle.css"),
        // , {
        //     //allChunks: true
        // }),
        new webpack.ProvidePlugin({
            _: "lodash",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        })
    ],

    module: {
        noParse: [],
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?includePaths[]=" + path.resolve(__dirname, "./src/aap")),
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
            }
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
        modulesDirectories: ['node_modules']
    }

};

config.addVendor('jquery', path.resolve(node_modules, 'jquery/dist/jquery.min.js'));
config.addVendor('lodash', __dirname + '/src/app/utils/lodash.min.js');
config.addVendor('es6-promise', node_modules + '/es6-promise/dist/es6-promise.min.js');


if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    );
}
module.exports = config;
