'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: './app/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      include: [
        path.join(__dirname, 'app'),
        path.resolve(__dirname, 'node_modules/preact-compat'),
      ],
      query: {
        plugins: [
          'transform-object-assign',
          ["module-resolver", {
            "root": ["."],
            "alias": {
                "react": "preact-compat",
                "react-dom": "preact-compat"
            }
          }]
        ]
      }
    }]
  }
};
