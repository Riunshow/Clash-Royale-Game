const { isFontCSS } = require('./helper')

const loadFont = () => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: process.env.RS_FLAT_FILES
                ? '[name].[hash:8].[ext]'
                : 'fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        // https://github.com/typekit/webfontloader
        // .font.css is used when loading custom fonts via webfontloader. It is
        // .css, actually. Just use a different suffix to distinguish it from
        // general CSS.
        test: isFontCSS,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
})

module.exports = loadFont
