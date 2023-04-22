const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

const pages = ['home']

module.exports = {
  entry: pages.reduce((config, pageName) => {
    config[pageName] = `${paths.src}/pages/${pageName}/${pageName}.js`
    return config
  }, {}),
  output: {
    path: paths.build,
    filename: '[name].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/static`,
          to: `${paths.build}/static`,
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    ...pages.map(
      (pageName) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `${paths.src}/pages/${pageName}/index.html`,
          filename: pageName === 'home' ? 'index.html' : `${pageName}.html`,
          chunks: [pageName],
        })
    ),
  ],
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      pages: `${paths.src}/pages`,
      helpers: `${paths.src}/helpers`,
      core: `${paths.src}/core`,
    },
  },
}
