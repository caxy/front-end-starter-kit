const project = require('../config/project.config');

const styleguideConfig = {
    source: [
        project.paths.client('styles'),
        project.paths.client('styleguide/pattern-markup')
    ],
    styleguide_version: '0.0.1',
    destination: project.paths.dist('styleguide'),
    title: 'Caxy Front End Starter Kit Styleguide'
};

module.exports = styleguideConfig;
