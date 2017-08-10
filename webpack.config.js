const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package');

const plugins = [
  new webpack.BannerPlugin(
`Environment Notifier v${packageJson.version}
Copyright (c) 2017 Ritter Insurance Marketing`),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
];

module.exports = {
  entry: [
    './node_modules/sweetalert2/dist/sweetalert2.min.css',
    './src/environment-notifier.js'
  ],
  output: {
    path: __dirname + '/lib',
    filename: 'environment-notifier.min.js',
    library: 'EnvironmentNotifier',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: plugins,
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demo')
  }
};
