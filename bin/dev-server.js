const project = require('../config/project.config');
const server = require('../server/main');
const debug = require('debug')('app:bin:dev-server');

// Start the Express server at the configured port on localhost.
server.listen(project.server_port);
debug(`Server is now running at http://localhost:${project.server_port}.`);
