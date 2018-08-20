function toArray(data) {
  return data ? (Array.isArray(data) ? data : [data]) : []
}

const loadJSX = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude: [/node_modules/, ...toArray(exclude)],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.val\.js$/,
        use: {
          loader: 'val-loader',
        },
      },
    ],
  },
})

module.exports = loadJSX
