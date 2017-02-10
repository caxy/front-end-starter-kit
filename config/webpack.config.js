const argv = require('yargs').argv;
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');
const debug = require('debug')('app:config:webpack');

// Helper variables to determine the environment.
const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

debug('Creating configuration.');
const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve : {
    modules: [project.paths.client()],
    extensions : ['.js', '.jsx', '.json']
  },
  module : {}
};

// ------------------------------------
// Entry Points
//
// There are two entry points - app and vendor. All the vendor modules used in the app should be added to the
// compiler_vendors array. This allows us to use the CommonsChunkPlugin to extract vendor modules from our app
// bundle and place them into a vendor bundle, which allows for long-term caching, speeding up load times.
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = {
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY]
};

if (project.compiler_devtool.length) {
  webpackConfig.entry.vendor = project.compiler_vendors;
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename   : `[name].[${project.compiler_hash_type}].js`,
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  // DefinePlugin is used to define global variables that can be used in the app.
  new webpack.DefinePlugin(project.globals),
  // HtmlWebpackPlugin injects the bundled assets into the entry HTML file.
  // This is useful since our bundle names contain a hash which changes on compile.
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    hash     : false,
    favicon  : project.paths.public('favicon.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true
    }
  })
];

// Add StyleguidePlugin if styleguide is enabled.
if (project.styleguide_enabled) {
  const StyleguidePlugin = require('caxy-styleguide-webpack-plugin');
  const styleguideConfig = require('./styleguide.config');

  webpackConfig.plugins.push(new StyleguidePlugin(styleguideConfig));
}

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (UglifyJS).');
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  loader  : 'babel-loader',
  options   : project.compiler_babel
}, {
  test   : /\.json$/,
  loader : 'json'
}];

// ------------------------------------
// Style Loaders
//
// style    - This loader injects <style> tags.
// css      - Resolves imports and returns css.
// postcss  - Applies PostCSS processing.
// sass     - Loads and compiles sass files.
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize';

webpackConfig.module.rules.push({
  test    : /\.scss$/,
  use : [
    'style-loader',
    BASE_CSS_LOADER,
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        includePaths : project.paths.client('styles'),
        sourceMap : true
      }
    }
  ]
});
webpackConfig.module.rules.push({
  test    : /\.css$/,
  use : [
    'style-loader',
    BASE_CSS_LOADER,
    'postcss-loader'
  ]
});

// webpackConfig.postcss = [
//   cssnano({
//     autoprefixer : {
//       add      : true,
//       remove   : true,
//       browsers : ['last 2 versions']
//     },
//     discardComments : {
//       removeAll : true
//     },
//     discardUnused : false,
//     mergeIdents   : false,
//     reduceIdents  : false,
//     safe          : true,
//     sourcemap     : true
//   })
// ];

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
);
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS loaders.');
  webpackConfig.module.rules.filter((loader) =>
    loader.use && loader.use.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    debug(loader)
    const first = loader.use[0];
    const rest = loader.use.slice(1);
    loader.use = ExtractTextPlugin.extract({
      fallback: first,
      use: rest
    })
  });

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename : '[name].[contenthash].css',
      allChunks : true
    })
  )
}

module.exports = webpackConfig;
