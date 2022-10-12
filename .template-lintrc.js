'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-curly-component-invocation': { allow: ['app-name'] },
    'no-implicit-this': { allow: ['app-name'] },
    'require-input-label': {
      labelTags: ['AuLabel'],
    },
  },
};
