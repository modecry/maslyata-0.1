const webpackCommonConfig = require('./webpack.common.js')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

config = {
  ...webpackCommonConfig,
  optimization: {
    ...webpackCommonConfig.optimization,
    minimizer: [new CssMinimizerPlugin()],
  },
  mode: 'production',
}

delete config.devtool

module.exports = config
