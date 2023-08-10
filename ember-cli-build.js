'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const webpack = require('webpack');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    '@appuniversum/ember-appuniversum': {
      disableWormholeElement: true,
      dutchDatePickerLocalization: true,
    },
    autoImport: {
      webpack: {
        plugins: new webpack.IgnorePlugin({
          // workaround for https://github.com/embroider-build/ember-auto-import/issues/578
          resourceRegExp: /moment-timezone/,
        }),
      },
    },
  });

  return app.toTree();
};
