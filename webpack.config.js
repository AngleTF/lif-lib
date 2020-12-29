const path = require('path');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const main = path.resolve(src, 'index.js');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require('webpack');

const config = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry: {
        main: main
    },
    output: {
        path: dist,
        filename: '[name].js',
        library: 'lifLib',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'eslint-loader' }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new UglifyJsPlugin({
            parallel: true
        })
    ],
    optimization: {
        usedExports: true
    }
};

module.exports = (env) => {
    return config;
};
