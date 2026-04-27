import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { registerFormField } from 'frontend-worship-decisions/components/submissions/fields/decision-articles-field';
import { registerFormField as registerDecisionDocumentsField } from 'frontend-worship-decisions/components/submissions/fields/decision-documents-field';
import { registerFormField as registerDecisionRemoteDocumentsField } from 'frontend-worship-decisions/components/submissions/fields/decision-remote-documents';

export default class SearchSubmissionsShowRoute extends Route {
  @service store;

  constructor() {
    super(...arguments);

    registerFormField();
    registerDecisionDocumentsField();
    registerDecisionRemoteDocumentsField();
  }

  model(params) {
    return this.store.findRecord('submission', params.id, {
      include: [
        'organization.classificatie',
        'organization.primary-site.address.provincie',
        'form-data.types',
        'last-modifier',
      ].join(','),
    });
  }
}
