const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = (
  { template, filename } = {
    template: 'src/index.html',
    filename: 'index.html',
  }
) => ({
  plugins: [
    new HTMLWebpackPlugin({
      template,
      filename,
    }),
  ],
})
