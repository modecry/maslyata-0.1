const webpackCommonConfig = require('./webpack.common.js')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

config = {
  ...webpackCommonConfig,
  optimization: {
    ...webpackCommonConfig.optimization,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      `...`,
      new CssMinimizerPlugin()
    ],
  },
  mode: 'production'
}

delete config.devtool

module.exports = config
