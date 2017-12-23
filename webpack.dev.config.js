"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
	test: /\.jsx?$/,
	exclude: /(node_modules|bower_components|public\/)/,
	loader: ['react-hot-loader/webpack', 'babel-loader']
});

loaders.push({
  test: require.resolve('two.js'),
  loader: 'imports-loader?this=>window',
});

module.exports = {
  entry: [
		'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/index.js', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: '[hash].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
		alias: {
		  animations: path.resolve(__dirname, 'src/utils/animations'),
		  config: path.resolve(__dirname, 'src/utils/config'),
		  yuen: path.resolve(__dirname, 'src/assets/images/animations/yuen'),
		  vapor: path.resolve(__dirname, 'src/assets/images/animations/vapor'),
		  naruto: path.resolve(__dirname, 'src/assets/images/animations/naruto'),
		  images: path.resolve(__dirname, 'src/assets/images'),
		},
  },
  module: {
    loaders
  },
  plugins: [
    new BundleAnalyzerPlugin(),
		new LodashModuleReplacementPlugin,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      title: 'Beact (dev)',
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ["bundle.js"],
      },
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/utils/autotrack.js' },
      { from: 'src/assets/audio', to: 'assets/audio' },
      { from: 'src/assets/images/logo.png' },
      { from: 'src/assets/images/ico/flash.ico' },
      { from: 'src/assets/images/animations/yuen/bg.jpg' },
    ]),
  ]
};
