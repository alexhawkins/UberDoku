const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");


module.exports = {
    devServer: {
        contentBase: 'public'
            // publicPath: 'public'
    },
    devtool: 'source-map',
    debug: true,
    cache: false,

    context: __dirname,
    publicPath: 'public',

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js', 2),
        new ExtractTextPlugin("bundle.css"),
        new webpack.ProvidePlugin({
            _: "underscore",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery"
        })
    ],
    entry: {
        app: ["./src/app/UberDoku.Module.es6"]
    },
    output: {
        path: process.env.NODE_ENV === 'production' ? './dist' : './public',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map'
    },
    stats: {
        colors: true,
        reasons: true
    },
    module: {
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
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?includePaths[]=" + path.resolve(__dirname, "./src")),
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
        root: __dirname,
        extensions: [
            '',
            '.js',
            '.es6',
            '.es6.js',
            '.json',
            '.webpack.js',
            '.web.js',
            '.sass',
            '.scss',
            '.css',
            '.html'
        ],
        modulesDirectories: ['src/app', 'node_modules', 'web_modules']
    },

};
