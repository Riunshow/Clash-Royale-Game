const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')()
const { isCSS } = require('./helper')

const loadCSS = ({ include, exclude, production } = {}) => ({
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53#issuecomment-400294569
          map: { inline: false, annotation: true },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash:8].css' : '[name].css',
      chunkFileName: production ? '[id].[contenthash:8].css' : '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: isCSS,
        include,
        exclude,
        use: [
          {
            loader: production ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          },
        ],
      },
    ],
  },
})

module.exports = loadCSS
