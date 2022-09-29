/* eslint-env node */
'use strict';

module.exports = function () {
  //see https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/issues/52
  process.env.GIT_DISCOVERY_ACROSS_FILESYSTEM = 1;
  let ENV = {
    build: {
      environment: 'production',
    },
    'ssh-index': {
      username: 'root',
      host: 'rpio-dev.s.redpencil.io',
      remoteDir: '/data/app-worship-decisions-dev/worship-decisions-app',
      agent: process.env.SSH_AUTH_SOCK,
      port: 22,
      allowOverwrite: true,
    },
    rsync: {
      dest: '/data/app-worship-decisions-dev/worship-decisions-app',
      host: 'root@rpio-dev.s.redpencil.io',
      port: 22,
      delete: false,
      privateKey: process.env.SSH_AUTH_SOCK,
      arg: ['--verbose'],
    },
  };

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
