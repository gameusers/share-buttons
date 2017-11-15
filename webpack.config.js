const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 環境を記述 development or production
const env = 'production';

const config = {
  entry: {
    option: './js/entry-option.jsx',
    share: './js/entry-share.jsx',
  },
  output: {
    path: path.join(__dirname, '/js'),
    filename: '[name]-bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css'],
    // alias: {
    //   // root: path.resolve('../../../../../../../', 'node_modules')
    //   // root: path.resolve(__dirname, '../../../../../../node_modules/')
    //   // root: path.resolve(__dirname, 'node_modules/')
    //   root: path.resolve('./', 'node_modules')
    //   // root: path.resolve(__dirname, '../../../../../../../node_modules/')
    // }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: env,
      TYPE: 'plugin',
      PATH: path.resolve(__dirname, 'node_modules/')
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    })
  ],
  devtool: 'source-map'
};

// Production ビルドの場合は圧縮する
if (env === 'production') {
  config.plugins.push(
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        warnings: false
      }
    })
  );
}

module.exports = config;
