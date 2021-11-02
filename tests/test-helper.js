import Application from 'frontend-public-decisions/app';
import config from 'frontend-public-decisions/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
