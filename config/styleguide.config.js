const project = require('../config/project.config');

/**
 * Configuration object for the kss-node styleguide.
 *
 * This config is passed into StyleguidePlugin (caxy-styleguide-webpack-plugin) in webpack.config.js
 * when the styleguide is enabled.
 */
const styleguideConfig = {
  // Project-specific settings pulled from project.config.js.
  styleguide_version: project.styleguide_version,
  title: project.styleguide_title,
  hide_pattern_status: project.styleguide_hide_pattern_status,
  destination: project.paths.styleguideOutput(),

  // Source directories for KSS documentation.
  source: [
    project.paths.client('styles'),
    project.paths.client('styleguide/pattern-markup'),
    project.paths.client('styleguide/project-assets')
  ],

  // Custom SASS files to be included in styleguide, but not the project/application.
  sass: {
    files: [
      project.paths.client('styleguide/project-assets/_project-specific.scss')
    ],
    includePaths: [
      project.paths.base('node_modules'),
      project.paths.client('styles')
    ]
  },

  // Use the kss-caxy-zaba-template as the builder.
  builder: project.paths.base('node_modules/kss-caxy-zaba-template'),

  // Custom kss-node options.
  custom: project.styleguide_custom_options
};

module.exports = styleguideConfig;
