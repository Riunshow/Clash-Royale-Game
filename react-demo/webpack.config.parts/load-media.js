const loadMedia = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|mp4|m4a|mp3|wav)$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options: {
            name: process.env.RS_FLAT_FILES
              ? '[name].[hash:8].[ext]'
              : 'media/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.atlas$/,
        use: ['raw-loader'],
      },
    ],
  },
})

module.exports = loadMedia
