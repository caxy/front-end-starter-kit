const path = require('path');
const debug = require('debug')('app:config:project');
const argv = require('yargs').argv;
const ip = require('ip');

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_public : 'public',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------

  // This block is used to configure webpack's babel loader. This enables ES2015 features.
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime'],
    presets        : ['es2015']
  },

  // Enables source maps in webpack. May be overridden in environments.config.js
  compiler_devtool         : 'source-map',

  // Configure hash type to use in bundle's filename. May be overridden in environments.config.js
  compiler_hash_type       : 'hash',

  // Set to true if the compiler should fail if the webpack compiler's stats object has warnings.
  compiler_fail_on_warning : false,

  // Set to true to reduce output from webpack-dev-middleware
  compiler_quiet           : false,

  // Configure the webpack bundle's public path. May be overridden in environments.config.js
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },

  // Any vendor modules used in the source code should be placed here. This includes things like babel-polyfill,
  // react, redux, angular, etc. This allows webpack to create a separate entry point for these vendor modules,
  // so they can be cached by the browser regardless of changes in the app bundle.
  compiler_vendors : [

  ]
};

/************************************************
 -------------------------------------------------
 All Internal Configuration Below
 Edit at Your Own Risk
 -------------------------------------------------
 ************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    )
  });

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args)
}

config.paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments.config');
const overrides = environments[config.env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config))
} else {
  debug('No environment overrides found, defaults will be used.')
}

module.exports = config;
