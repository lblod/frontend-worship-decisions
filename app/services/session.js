import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-public-decisions/config/environment';

export default class SessionService extends BaseSessionService {
  @service currentSession;

  handleInvalidation() {
    const logoutUrl = ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'];
    super.handleInvalidation(logoutUrl);
  }
}
