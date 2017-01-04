import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
        plugins: [
          'transform-runtime'
        ],
        presets: ['es2015', 'react', 'stage-0']
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}

export default webpackConfig
