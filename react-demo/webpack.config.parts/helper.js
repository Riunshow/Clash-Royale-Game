function isCSS(filename) {
  return filename.endsWith('.css')
    && !filename.endsWith('.font.css')
}

function isFontCSS(filename) {
  return /\.font.css$/.test(filename)
}

module.exports = {
  isCSS,
  isFontCSS,
}
