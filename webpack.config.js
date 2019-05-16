'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('inviter.css');

var path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: "development",
  output: {
    path: __dirname + '/dist',
    filename: 'inviter.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9899,
    watchContentBase: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
    ]
  },
  plugins: [ 
    extractLESS
  ]
};