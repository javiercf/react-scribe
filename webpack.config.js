var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/example/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './example/main.js',
    './src/react-scribe.scss',
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  sassLoader: {
    includePaths: [__dirname, './src/']
  },
  plugins: [
    HtmlWebpackPluginConfig,
  ]
};
