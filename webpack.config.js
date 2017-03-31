'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'

const config = {
    entry: './src/js/app.js',
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
                                    require('postcss-nested'),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
        ],
    },
    output: {
        filename: 'assets/app-[hash].js',
    },
    plugins: [
        new CleanWebpackPlugin(['assets'], {
            watch: true,
        }),
        new ExtractTextPlugin('assets/style-[contenthash].css'),
    ],
};

let minify = false;

if (isProduction) {
    Array.prototype.push.apply(config.plugins, [
        new BabiliPlugin(),
    ]);

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

Array.prototype.push.apply(config.plugins, [
    new HtmlWebpackPlugin({
        minify,
        template: './src/index.html',
    }),
]);

module.exports = config;
