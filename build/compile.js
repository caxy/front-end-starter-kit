import webpackCompiler from './webpack-compiler'
import webpackConfig from './webpack.config'
import _debug from 'debug'

const debug = _debug('app:build:compile')

;(async function () {
  try {
    debug('Run compiler')
    const stats = await webpackCompiler(webpackConfig)

    if (stats.warnings.length > 0) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }

    // copy static assets
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
