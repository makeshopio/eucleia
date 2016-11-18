'use strict';

var path = require('path');
var webpack = require('webpack');
var del = require('del');
var OptimizeJsPlugin = require("optimize-js-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

class CleanPlugin {
  constructor(options) {
    this.options = options;
  }

  apply () {
    del.sync(this.options.files);
  }
}

module.exports = {
  entry: ['bootstrap-loader/extractStyles', './app/index'],
  devtool: 'source-map',
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
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanPlugin({
      files: ['dist/*']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        dead_code: true,
        drop_debugger: true,
        conditionals: true,
        booleans: true,
        loops: true,
        unused: true,
        if_return: true,
        cascade: true,
        collapse_vars: true,
        reduce_vars: true,
        drop_console: true,
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new OptimizeJsPlugin({
      sourceMap: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.[^map]+$/,
      minRatio: 0.8
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'app'),
          path.resolve(__dirname, 'node_modules/preact-compat'),
        ],
        query: {
          plugins: [
            'transform-object-assign',
            'transform-react-constant-elements',
            // 'transform-react-inline-elements',
            'transform-react-remove-prop-types',
            'transform-react-pure-class-to-function',
            ['module-resolver', {
              'root': ['.'],
              'alias': {
                  'react': 'preact-compat',
                  'react-dom': 'preact-compat'
              }
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!postcss',
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]' +
            '!postcss' +
          '!sass',
        }),
      },

      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        loader: 'url',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file',
      },
    ]
  }
};
