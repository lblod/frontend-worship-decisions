import BaseSessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-public-decisions/config/environment';

export default class SessionService extends BaseSessionService {
  handleInvalidation() {
    const logoutUrl = ENV.torii.providers['acmidm-oauth2'].logoutUrl;
    super.handleInvalidation(logoutUrl);
  }
}
