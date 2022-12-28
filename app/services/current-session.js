import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked account;
  @tracked user;
  @tracked group;
  @tracked groupClassification;

  async load() {
    if (this.session.isAuthenticated) {
      let accountId =
        this.session.data.authenticated.relationships.account.data.id;
      this.account = await this.store.findRecord('account', accountId, {
        include: 'gebruiker',
      });

      this.user = await this.account.gebruiker;

      let groupId = this.session.data.authenticated.relationships.group.data.id;
      this.group = await this.store.findRecord('bestuurseenheid', groupId, {
        include: 'classificatie',
      });
      this.groupClassification = await this.group.classificatie;
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
}
