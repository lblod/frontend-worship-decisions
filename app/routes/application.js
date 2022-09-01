import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'frontend-public-decisions/config/environment';

export default class ApplicationRoute extends Route {
  @service router;
  @service currentSession;
  @service session;
  @service plausible;

  async beforeModel() {
    await this.session.setup();
    return Promise.all([this.startAnalytics(), this.loadCurrentSession()]);
  }

  async loadCurrentSession() {
    try {
      this.currentSession.load();
    } catch (error) {
      this.session.invalidate();
    }
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
}
