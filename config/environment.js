'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'frontend-public-decisions',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    moment: {
      allowEmpty: true,
    },
    //TODO: activate once ACM/IDM is ready
    torii: {
      disableRedirectInitializer: true,
      providers: {
        'acmidm-oauth2': {
          apiKey: '{{OAUTH_API_KEY}}',
          baseUrl: '{{OAUTH_BASE_URL}}',
          scope: 'openid vo profile abb_besluitendatabank',
          redirectUri: '{{OAUTH_REDIRECT_URL}}',
          logoutUrl: '{{OAUTH_LOGOUT_URL}}',
        },
      },
    },
    browserUpdate: {
      vs: { i: 11, f: -3, o: -3, s: -3, c: -3 },
      style: 'corner',
      l: 'nl',
      shift_page_down: false,
    },
    // This config can be removed once the auto-startup logic is removed from ember-plausible:
    // https://github.com/redpencilio/ember-plausible/issues/4
    'ember-plausible': {
      enabled: false,
    },
    plausible: {
      domain: '{{ANALYTICS_APP_DOMAIN}}',
      apiHost: '{{ANALYTICS_API_HOST}}',
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
