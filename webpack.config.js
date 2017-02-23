const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package');

const plugins = [
  new webpack.BannerPlugin(
`Environment Notifier v${packageJson.version}
Copyright (c) 2017 Ritter Insurance Marketing`),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
];

if (process.env.INCLUDE_WEBPACK_HTML) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      filename: '../index.html',
      inject: 'head'
    })
  );
}

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
  devServer: {
    inline: true
  },
  plugins: plugins
};
