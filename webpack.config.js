'use strict';

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production'

const config = {
    entry: [
        './src/js/app.js',
        './src/css/style.css',
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('stylelint'),
                                    require('postcss-nesting'),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'eslint-loader',
                ],
            }
        ],
    },
    output: {
        filename: 'app-[hash].js',
        path: path.resolve(__dirname, 'assets'),
        publicPath: 'assets/',
    },
    plugins: [
        new CleanWebpackPlugin(['assets'], {
            watch: true,
        }),
        new ExtractTextPlugin('style-[contenthash].css'),
    ],
};

let minify = false;

if (isProduction) {
    config.plugins.push(
        new BabiliPlugin(),
    );

    minify = {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
    };
}

config.plugins.push(
    new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        filename: path.resolve(__dirname, 'index.html'),
        minify,
        template: './src/index.html',
    }),
    new HtmlWebpackHarddiskPlugin(),
);

module.exports = config;
