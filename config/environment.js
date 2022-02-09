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
          apiKey: 'b772fce4-ebd8-4980-b51c-8e0d73fe75d2',
          baseUrl: 'https://authenticatie-ti.vlaanderen.be/op/v1/auth',
          scope: 'openid vo profile ABBBesluitenDatabank',
          redirectUri: 'https://besluiten.lokaalbestuur.lblod.info/authorization/callback',
          logoutUrl: 'https://authenticatie-ti.vlaanderen.be/op/v1/logout'
        }
      }
    },
    browserUpdate: {
      vs: { i: 11, f: -3, o: -3, s: -3, c: -3 },
      style: 'corner',
      l: 'nl',
      shift_page_down: false,
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

  if (process.env.DEPLOY_ENV === 'production') {
    //TODO: activate once ACM/IDM is ready
    // ENV['torii']['providers']['acmidm-oauth2']['apiKey'] = '581c5176-1a08-48d6-a9ef-e6fb95fe6010';
    // ENV['torii']['providers']['acmidm-oauth2']['baseUrl'] = 'https://authenticatie.vlaanderen.be/op/v1/auth';
    // ENV['torii']['providers']['acmidm-oauth2']['redirectUri'] = 'https://besluiten.abb.vlaanderen.be/authorization/callback';
    // ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'] = 'https://authenticatie.vlaanderen.be/op/v1/logout';
  }

  return ENV;
};
