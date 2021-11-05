import { getOwner } from '@ember/application';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-public-decisions/config/environment';

export default class ApplicationRoute extends Route {
  @service currentSession;

  beforeModel() {
    return this.loadCurrentSession();
  }

  async sessionAuthenticated() {
    await this.loadCurrentSession();

    // The current session needs to be loaded before we start transitioning
    // because the transitioning depends on the user roles loaded in the current session

    // Since not calling this._super(...arguments) on the first line doesn't work
    // we copy the implementation ApplicationRouteMixin.sessionAuthenticated here
    const attemptedTransition = this.session.attemptedTransition;
    const cookies = getOwner(this).lookup('service:cookies');
    const redirectTarget = cookies.read('ember_simple_auth-redirectTarget');

    if (attemptedTransition) {
      attemptedTransition.retry();
      this.session.attemptedTransition = null;
    } else if (redirectTarget) {
      this.transitionTo(redirectTarget);
      cookies.clear('ember_simple_auth-redirectTarget');
    } else {
      this.transitionTo(this.routeAfterAuthentication);
    }
    // End of copy from ApplicationRouteMixin.sessionAuthenticated
  }

  sessionInvalidated() {
    const logoutUrl = ENV['torii']['providers']['acmidm-oauth2']['logoutUrl'];
    window.location.replace(logoutUrl);
  }

  loadCurrentSession() {
    return this.currentSession.load().catch(() => this.session.invalidate());
  }
}
