'use strict';

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production'

let config = {
    entry: [
        './src/js/app.js',
        './src/css/style.css',
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        }),
    ],
};

let minify = false;

if (isProduction) {
    config = {
        ...config,
        plugins: [
            ...config.plugins,
            new BabiliPlugin(),
        ],
    };

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

config = {
    ...config,
    plugins: [
        ...config.plugins,
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: path.resolve(__dirname, 'index.html'),
            minify,
            template: './src/index.html',
        }),
        new HtmlWebpackHarddiskPlugin(),
    ],
};

module.exports = config;
