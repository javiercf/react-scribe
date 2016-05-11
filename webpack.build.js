var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin('./dist/react-scribe.min.css');

module.exports = {
  entry: [
    './src/main.js',
    './src/react-scribe.scss',
  ],
  debug: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract(['css','sass'])
      },
    ]
  },

  output: {
    filename: './dist/react-scribe-editor.min.js',
    library: 'ReactScribeEditor',
    libraryTarget: 'umd'
  },

  plugins: [
    extractCSS,
  ]
};
