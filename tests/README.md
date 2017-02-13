# Unit tests

## Running Tests

Run test suite:

```bash
$ yarn test
```

## Adding Tests

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them.

The `tests` directory structure should reflect the directory structure in `src`, and the test file names should match the files they are testing with the `.spec.js` suffix added.

## Configuration

#### Karma

Karma can be configured in `~/config/karma.config.js`.

#### Test Bundler

The tests are bundled in `~/tests/test-bundler.js` which loads and bundles all tests matching `tests/**/*.spec.js`.

## Testing Framework

### Testing Stack:

#### Core Libraries

- Mocha   : Javascript test framework
- Chai    : Assertion/expectation library that can be paired with any Javascript testing framework.
- Sinon   : Test spies, stubs, and mocks. No dependencies and works with any unit testing framework.
- Karma   : Test runner that works with the testing framework to run the tests in any browsers.

#### Additional Packages

- babel-plugin-istanbul
- chai-as-promised
- codecov
- karma-coverage
- karma-mocha
- karma-mocha-reporter
- karma-phantomjs-launcher
- karma-webpack-with-fast-source-maps
- phantomjs-prebuilt
- sinon-chai


### Code Coverage

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying coverage_reporters in `~/config/project.config.js`.
