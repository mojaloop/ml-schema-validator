# ml-schema-validator
[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/ml-schema-validator.svg?style=flat)](https://github.com/mojaloop/ml-schema-validator/commits/master)
[![Git Releases](https://img.shields.io/github/release/mojaloop/ml-schema-validator.svg?style=flat)](https://github.com/mojaloop/ml-schema-validator/releases)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/ml-schema-validator.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/ml-schema-validator)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/ml-schema-validator.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/ml-schema-validator)
[![CircleCI](https://circleci.com/gh/mojaloop/ml-schema-validator.svg?style=svg)](https://circleci.com/gh/mojaloop/ml-schema-validator)

Shared Joi validation code for Mojaloop services

Contents:

- [Usage](#usage)
- [Tests](#tests)

## Usage
The library supports both Joi validation >= version 17.
To use the library you can import it into your project

## Tests

Running the tests:

    npm run test
    npm run test:unit
    npm run test:coverage
    npm run test:coverage-check
        
Tests include code coverage. See the test/unit/ folder for testing scripts.

## Auditing Dependencies

We use `npm-audit-resolver` along with `npm audit` to check dependencies for vulnerabilities, and keep track of resolved dependencies with an `audit-resolve.json` file.

To start a new resolution process, run:
```bash
npm run audit:resolve
```

You can then check to see if the CI will pass based on the current dependencies with:
```bash
npm run audit:check
```

And commit the changed `audit-resolve.json` to ensure that CircleCI will build correctly.
