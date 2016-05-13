var webpack = require('webpack');

module.exports = {
  entry: [
    './src/ScribeEditor.js',
  ],

  debug: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  },

  output: {
    path: __dirname + '/lib',
    filename: 'react-scribe-editor.js',
    library: 'ScribeEditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      'root': 'React',
    },

    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM',
    }
   },

   plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
   ]
};
