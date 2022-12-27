import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-worship-decisions/config/environment';

export default class ApplicationRoute extends Route {
  @service router;
  @service session;
  @service currentSession;
  @service plausible;

  async beforeModel() {
    await this.session.setup();
    await this.startAnalytics();
    return this._loadCurrentSession();
  }

  async startAnalytics() {
    let { domain, apiHost } = ENV.plausible;

    if (
      domain !== '{{ANALYTICS_APP_DOMAIN}}' &&
      apiHost !== '{{ANALYTICS_API_HOST}}'
    ) {
      await this.plausible.enable({
        domain,
        apiHost,
      });
    }
  }

  _loadCurrentSession() {
    return this.currentSession.load().catch((e) => {
      warn(e, { id: 'session-load-failure' });
      this.session.invalidate();
    });
  }
}
