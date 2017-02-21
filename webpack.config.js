const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package');

module.exports = {
  entry: [
    './src/environment-notifier.js'
  ],
  output: {
    path: './lib',
    filename: 'environment-notifier.min.js',
    library: 'EnvironmentNotifier',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin(
`Environment Notifier v${packageJson.version}
Copyright (c) 2017 Ritter Insurance Marketing`),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: '../index.html',
      inject: 'head'
    })
  ]
};
