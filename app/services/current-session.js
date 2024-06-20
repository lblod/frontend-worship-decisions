import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const ADMIN_ROLE = 'LoketLB-admin';

export default class CurrentSessionService extends Service {
  @service impersonation;
  @service session;
  @service store;

  @tracked account;
  @tracked _roles = [];

  get user() {
    return this.account.belongsTo('gebruiker').value();
  }

  get groupClassification() {
    return this.group?.belongsTo('classificatie').value();
  }

  async load() {
    if (this.session.isAuthenticated) {
      await this.impersonation.load();
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;

      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker.bestuurseenheden.classificatie',
      });

      // We need to do an extra API call here because ACM/IDM users don't seem to have a "bestuurseenheden" relationship in the DB.
      // By fetching the record directly we bypass that issue
      const groupId =
        this.session.data.authenticated.relationships.group.data.id;
      this.group = await this.store.findRecord('bestuurseenheid', groupId, {
        include: 'classificatie',
        reload: true,
      });

      this._roles = this.session.data.authenticated.data.attributes.roles;
    }
  }

  get groupName() {
    if (!this.group) {
      return '';
    } else {
      if (this.groupNameHasNoClassificationInlabel) {
        return `${this.groupClassification.label} ${this.group.naam}`;
      } else {
        return this.group && this.group.naam;
      }
    }
  }

  get groupNameHasNoClassificationInlabel() {
    return (
      this.groupClassification &&
      // provincie en gemeente
      [
        'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000000',
        'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001',
      ].indexOf(this.groupClassification.uri) > -1
    );
  }

  get isAdmin() {
    let roles = this._roles;
    if (this.impersonation.isImpersonating) {
      roles = this.impersonation.originalRoles || [];
    }
    return roles.includes(ADMIN_ROLE);
  }
}
