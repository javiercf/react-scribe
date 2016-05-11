var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin('./dist/react-scribe.min.css');

module.exports = {
  entry: [
    './src/index.js',
    './src/react-scribe.scss',
  ],
  debug: false,

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

  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    },
  },

  output: {
    filename: './dist/react-scribe-editor.min.js',
    library: 'ReactScribeEditor',
    libraryTarget: 'umd'
  },

  plugins: [
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};
