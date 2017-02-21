# Caxy Front End Starter Kit

Note: This is currently a WIP.

TODO: PROJECT DESCRIPTION

## Table of Contents

1. [Starter Kit Variations](#starter-kit-variations)
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Console Commands](#console-commands)
1. [Application Structure](#application-structure)
1. [Development](#development)
1. [Testing](#testing)
1. [Deployment](#deployment)
1. [Build System](#build-system)
1. [Learning Resources](#learning-resources)
1. [Contributing](#contributing)

## Starter Kit Variations

### Core

| Variation  | Sub-Variation | Branch name          | Description                             |
|------------|---------------|----------------------|-----------------------------------------|
| core       | n/a           | master               | The base to all starter kits            |
| styleguide | core          | kit/styleguide/core  | KSS Styleguide                          |

### React

| Variation  | Sub-Variation | Branch name          | Description                             |
|------------|---------------|----------------------|-----------------------------------------|
| react      | core          | kit/react/core       | The core branch for react starter kit   |
| react      | redux         | kit/react/redux      | React with react-redux                  |
| react      | redux-saga    | kit/react/redux-saga | React with react-redux and redux-saga   |

### AngularJS (1.x)

| Variation  | Sub-Variation | Branch name          | Description                             |
|------------|---------------|----------------------|-----------------------------------------|
| angular    | core          | kit/angular/core     | The core branch for angular starter kit |

### Branch Naming Conventions for Starter Kit Variations

1. Each starter kit variation must exist on separate branches.
1. Branch names for starter kit variations must start with `kit/` and follow this structure:

  ```
  kit/{variation-name}/core
  ```
  
  Where `{variation-name}` is the main library, framework, or feature for the variation.
  
  Branch names must always be broken into 3 parts (a part is deliminated by `/`).
  
  For example, the starter kits for react, angular, and angular2 will be on these 3 branches, respectively:
  
  ```
  kit/react/core
  
  kit/angular/core
  
  kit/angular2/core
  ```

1. A starter kit variation may have variations of itself. For sub-variations, branch names must follow this structure:

  ```
  kit/{variation-name}/{subvariation-name}
  ```
  
  Where `{subvariation-name}` is a short descriptor of the sub-variation.
  
  For example:
  
  ```
  kit/react/redux
  
  kit/react/redux-saga
  
  kit/angular/ui-router
  
  kit/angular2/material
  ```

## Features

* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)
* [eslint](http://eslint.org)

## Requirements

* node `^4.5.0`
* yarn `^0.17.0`

## Getting Started

First, clone the project:

```bash
$ git clone https://github.com/caxy/front-end-starter-kit.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and start it up! It is strongly recommended that you use [Yarn](https://yarnpkg.com/) instead of npm.

```bash
$ yarn install # Install project dependencies
$ yarn start   # Compile and launch (same as `npm start`)
```

If all is well, you should see something like this:

<img src="http://i.imgur.com/cHBLmkw.png" />

Open up [http://localhost:3000]() in your browser and you should see the starter kit welcome page!

## Console Commands

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn run <script>`|Description|
|-------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `yarn start`, but enables nodemon for the server as well.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`deploy:dev`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`deploy:prod`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|

## Application Structure

The application structure below is a starting point for the root project structure. This will be built upon as
standards are implemented for deeper directories.

*DEV: When proposing standards that affect the application structure, please update this tree.*


```
.
├── bin                      # Build/Start scripts
├── dist                     # The folder for the compiled output (ignored by git)
├── docs*                    # (optional) Supplemental documentation files for the project, if needed
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # (optional) Node server application that provides a http server for development
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── styleguide           # Assets used in the styleguide that are not used in the application
│   │   └── pattern-markup   # HTML partials for the styleguide referenced via KSS
│   ├── styles               # Application styles
│   ├── index.html           # Main HTML page container for app
│   └── main.js              # Application bootstrap and rendering
│── tests                    # Unit tests
└── package.json             # The list of 3rd party libraries and utilities
```

_* optional_

## Development

TODO: DOCUMENT DEVELOPER TOOLS AND HOW TO IMPLEMENT GENERIC THINGS

## Testing

TODO: DOCUMENT TESTING

## Deployment

The application may be served from the /dist directory generated by `yarn run deploy` and specifying your desired `NODE_ENV`.

## Build System

### Configuration

Default project configuration can be found in `~/config/project.config.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here **without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.config.js` and define overrides on a per-NODE_ENV basis. There are examples for both `development` and `production`, so use those as guidelines. Here are some common configuration options:

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Express server|
|`server_port`|port for the Express server|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|

Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/project.config.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|

### Styles

Both `.scss` and `.css` file extensions are supported out of the box. After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

### Server

This starter kit comes packaged with an Express server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Using a custom Express app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server) makes it easier to extend the starter kit to include functionality such as API's, universal rendering, and more -- all without bloating the base boilerplate.

### Integrating a Framework

If you are integrating a framework like Angular or React, you should bootstrap that framework in `src/main.js`, which serves as the app's entry point. For example, if you are using React and your root component is `AppComponent`, you can modify the render function to mount your application like so:

```js
let render = () => {
  ReactDOM.render(<AppContainer />, MOUNT_NODE)
}
```

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. In production, webpack will extract styles to a `.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

## Learning Resources

- [Express](http://expressjs.com/) - The Node.js server used for development.
- [Webpack](https://webpack.github.io/docs/) - For modifying the webpack configuration, webpack's own documentation is indispensable.

## Contributing

TODO: GENERAL INFO ON CONTRIBUTING TO THIS IF WE HAVE GUIDELINES OR OTHER THINGS
