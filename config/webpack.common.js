const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const paths = require('./paths')

const pages = ['home']

module.exports = {
  entry: pages.reduce((config, pageName) => {
    config[pageName] = [
      `${paths.src}/pages/${pageName}/${pageName}.js`,
      `${paths.src}/pages/${pageName}/style.css`,
    ]
    return config
  }, {}),
  mode: 'development',
  output: {
    path: paths.build,
    filename: '[name]/[name].js',
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
      patterns: [{
        from: `${paths.src}/static`,
        to: `${paths.build}/static`,
        globOptions: {
          ignore: ['*.DS_Store'],
        },
        noErrorOnMissing: true,
      }, ],
    }),
    ...pages.map(
      (pageName) =>
      new HtmlWebpackPlugin({
        inject: true,
        template: `${paths.src}/pages/${pageName}/${pageName === 'home' ? 'index' : pageName}.html`,
        filename: `${pageName === 'home' ? '' : `${pageName}/`}${pageName === 'home' ? 'index' : pageName}.html`,
        chunks: [pageName],
      })
    ),
    new MiniCssExtractPlugin({
      filename: ({
        chunk
      }) => `${chunk.name}/style.css`,
    })
  ],
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        use: ['babel-loader']
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
      },
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
  devtool: 'eval-cheap-module-source-map'
}