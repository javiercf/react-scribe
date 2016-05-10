var webpack = require('webpack');

module.exports = {
  entry: [
    './src/main.js',
  ],
  debug: false,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  },

  output: {
    filename: './dist/react-scribe-editor.min.js',
    library: 'ReactScribeEditor',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
