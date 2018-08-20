const path = require('path')
const webpack = require('webpack')

const setupIO = ({ srcDir, outputDir, production }) => {
  const RS_ASSETS_PATH = process.env.RS_ASSETS_PATH || ''

  const entry = path.join(srcDir, 'index.jsx')
  const output = {
    path: outputDir,
    // Because [chunkhash] is not available in non-production environments,
    // so replace it with [hash].
    filename: production ? 'main.[chunkhash:8].js' : 'main.js',
    publicPath: RS_ASSETS_PATH,
  }
  const plugins = [
    // make it possible to use environment vars in our code
    new webpack.DefinePlugin({
      'process.env.RS_ASSETS_PATH': JSON.stringify(RS_ASSETS_PATH),
    }),
  ]

  const resolve = {
    extensions: ['.js', '.jsx', '.val.js'],
  }

  return {
    resolve,
    entry,
    output,
    plugins,
  }
}

module.exports = setupIO
