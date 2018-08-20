const path = require('path')
const merge = require('webpack-merge')
const setupIO = require('./webpack.config.parts/setup-io')
const loadHTML = require('./webpack.config.parts/load-html')
const loadCSS = require('./webpack.config.parts/load-css')
const loadJSX = require('./webpack.config.parts/load-jsx')
const loadMedia = require('./webpack.config.parts/load-media')
const loadFont = require('./webpack.config.parts/load-font')
const minify = require('./webpack.config.parts/minify')
const forceCaseSensitivePath = require('./webpack.config.parts/force-case-sensitive-path')
const generateSourceMaps = require('./webpack.config.parts/generate-source-maps')
const cleanupBuilds = require('./webpack.config.parts/cleanup-builds')

const BASE_DIR = __dirname
const SRC_DIR = path.join(BASE_DIR, 'src')
const DIST_DIR = path.join(BASE_DIR, 'dist')

const commonConfig = merge([
  loadHTML(),
  loadJSX(),
  loadMedia(),
  loadFont(),
  forceCaseSensitivePath(),
])

const developmentConfig = () =>
  merge([
    setupIO({
      srcDir: SRC_DIR,
      outputDIR: DIST_DIR,
    }),
    commonConfig,
    loadCSS({ production: false }),
    generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  ])

const productionConfig = () =>
  merge([
    minify(),
    setupIO({
      srcDir: SRC_DIR,
      outputDIR: DIST_DIR,
      production: true,
    }),
    commonConfig,
    loadCSS({ production: true }),
    generateSourceMaps({ type: 'source-map' }),
    cleanupBuilds(DIST_DIR, { root: BASE_DIR }),
  ])

/* eslint-disable-next-line */
module.exports = function(_, argv) {
  const { mode } = argv
  console.log('[current mode]', mode)
  return mode === 'production' ? productionConfig() : developmentConfig()
}
