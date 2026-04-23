'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
// const { setConfig } = require('@warp-drive/core/build-config');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    babel: {
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform'),
        // NOTE: put any code coverage plugins last, after the transform.
      ],
    },
  });

  // TODO: uncomment once we have started resolving WarpDrive deprecations
  // setConfig(app, __dirname, {
  //   // this should be the most recent <major>.<minor> version for
  //   // which all deprecations have been fully resolved
  //   // and should be updated when that changes
  //   compatWith: '5.8',
  //   deprecations: {
  //     // ... list individual deprecations that have been resolved here
  //   },
  // });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticEmberSource: true,
    staticInvokables: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
