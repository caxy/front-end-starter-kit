const project = require('../config/project.config');

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
    title: 'Caxy Front End Starter Kit Styleguide'
};

module.exports = styleguideConfig;
