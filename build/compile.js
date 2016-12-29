import webpackCompiler from './webpack-compiler'
import webpackConfig from './webpack.config'

;(async function () {
  try {
    console.log('Run compiler')
    const stats = await webpackCompiler(webpackConfig)

    if (stats.warnings.length > 0) {
      console.log('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }

    // copy static assets
  } catch (e) {
    console.log('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
