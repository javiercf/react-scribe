var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js',
  ],
  debug: false,

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
    filename: './lib/react-scribe-editor.js',
     library: 'ScribeEditor',
    libraryFor: 'umd'
  },

  externals: {
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      'root': 'React',
      'var': 'React'
    },

    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM',
      'var': 'ReactDOM'
    }
   },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
