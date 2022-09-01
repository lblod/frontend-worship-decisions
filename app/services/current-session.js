import Service, { inject as service } from '@ember/service';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  async load() {
    if (this.session.isAuthenticated) {
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;

      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker',
      });

      this.user = await this.account.gebruiker;
      this.roles = this.session.data.authenticated.data.attributes.roles;

      let groupId = this.session.data.authenticated.relationships.group.data.id;
      this.group = await this.store.findRecord('bestuurseenheid', groupId);
    }
  }

  hasRole(role) {
    return this.roles.includes(role);
  }

  get canRead() {
    return this.hasRole('PubliekeBesluitendatabank-BesluitendatabankLezer');
  }
}
