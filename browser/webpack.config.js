/*
 * created by waweru
 */

'use strict';
require('dotenv').load();

const path=require('path');
const webpack=require('webpack');

// CONSTANT VARIABLES
const publicPath='/dist';
const outputPath=path.resolve(__dirname, './dist/');
const devtool = (process.env.NODE_ENV!=='production') ? 'inline-source-map' : 'source-map';
const output='app.js';

module.exports={
    devtool: 'eval',
    entry: './scripts/app.ts',
    output:{
        path: outputPath,
        filename: output,
        publicPath
    },
    performance: {
		hints: false
	},
    module: {
        rules: [
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
	        },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]'
                }
	        },
            { 
                test: /\.tsx?$/, 
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts'],
        modules: ['node_modules', 'bower_components'],
        enforceExtension: false,
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        hot: true
    }
};
