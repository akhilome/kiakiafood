const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 5000,
    historyApiFallback: true,
  },
});
