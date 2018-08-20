const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (...args) => ({
  plugins: [new CleanWebpackPlugin(...args)],
})
