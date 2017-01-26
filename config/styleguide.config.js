const project = require('../config/project.config');
const builder = require('kss-caxy-zaba-template');

const styleguideConfig = {
    source: [
        project.paths.client('styles'),
        project.paths.client('styleguide/pattern-markup'),
        project.paths.client('styleguide/project-assets')
    ],
    sass: {
        files: [
            project.paths.client('styleguide/project-assets/_project-specific.scss')
        ],
        includePaths: [
            project.paths.base('node_modules'),
            project.paths.client('styles')
        ]
    },
    styleguide_version: '0.0.1',
    destination: project.paths.dist('styleguide'),
    title: 'Caxy Front End Starter Kit Styleguide',
    hide_pattern_status: true,
    builder: project.paths.base('node_modules/kss-caxy-zaba-template/src'),
    custom: [
        'devnotes',
        'hidemarkup',
        'status',
        'patterntype',
        'containspatterns'
    ]
};

module.exports = styleguideConfig;
