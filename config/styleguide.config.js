const project = require('../config/project.config');

/**
 * Configuration object for the kss-node styleguide.
 *
 * This config is passed into StyleguidePlugin (caxy-styleguide-webpack-plugin) in webpack.config.js
 * when the styleguide is enabled.
 *
 *
 * Custom KSS Node Options
 *
 * All of these are optional, but they provide hooks between KSS and the current
 * handlebars approach that allow for extra information to be displayed.
 *
 * All of these are benign (that is, if you don't use them, nothing happens) aside
 * from `status`; `status` defaults to 'In Development' and as such needs planning
 * to accommodate effectively.
 *
 * hidemarkup
 * Not all patterns need to be accompanied by markup. In these cases, enabling this and
 * adding hidemarkup: true to a given KSS markup section will hide that section's markup.
 *
 * patterntype
 * Displays the atomic design pattern type of the current pattern.
 *
 * containspatterns
 * If the current pattern contains other patterns defined in the styleguide, listing them
 * here can be helpful (can include links).
 *
 * devnotes
 * In cases where clients need to use the styleguide for use reference and devs need
 * to reference it for implementation, devnotes can be used to split development-specific
 * notes into a different area.
 *
 * status
 * For projects that will require ongoing work or continuous integration, it may be useful
 * to display the status of a given pattern.
 */
const styleguideConfig = {
  // Project-specific settings pulled from project.config.js.
  styleguide_version: project.styleguide_version,
  title: project.styleguide_title,
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

  // Pattern Status filters
  // Pattern status filters will be made available when this is set to false.
  hide_pattern_status: true,

  // KSS Custom Options
  custom: [
    'hidemarkup',
    'patterntype',
    'containspatterns',
    'devnotes',
    'status'
  ]
};

module.exports = styleguideConfig;
