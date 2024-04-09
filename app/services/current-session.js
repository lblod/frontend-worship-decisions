import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const ADMIN_ROLE = 'LoketLB-admin';

export default class CurrentSessionService extends Service {
  @service impersonation;
  @service session;
  @service store;

  @tracked _account;
  @tracked _roles = [];

  get account() {
    if (this.impersonation.isImpersonating) {
      return this.impersonation.impersonatedAccount;
    } else {
      return this._account;
    }
  }
  get user() {
    return this.account.belongsTo('gebruiker').value();
  }

  get group() {
    return this.user.group;
  }

  get groupClassification() {
    return this.group?.belongsTo('classificatie').value();
  }

  async load() {
    if (this.session.isAuthenticated) {
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;

      this._account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker.bestuurseenheden.classificatie',
      });
      this._roles = this.session.data.authenticated.data.attributes.roles;

      if (this.isAdmin) {
        await this.impersonation.load();
      }
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
    return this._roles.includes(ADMIN_ROLE);
  }
}
