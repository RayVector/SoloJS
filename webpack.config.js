const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
