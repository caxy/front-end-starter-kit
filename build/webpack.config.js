import webpack from 'webpack'

const webpackConfig = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  }
}

export default webpackConfig
