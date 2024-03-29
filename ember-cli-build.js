'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {});

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    // Disabled for now, since it causes issues for the virtual `rsvp` module.
    // We can enable this again once we update to ember-acmidm-login v2
    // staticEmberSource: true,
    // amdCompatibility: {
    //   es: [['fetch', ['default', 'Headers']]], // Used by @lblod/ember-acmidm-login v1.4, we can remove this once we update to v2
    // },
  });
};
