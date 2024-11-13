import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { registerFormField } from 'frontend-worship-decisions/components/submissions/fields/decision-articles-field';
import { registerFormField as registerDecisionDocumentsField } from 'frontend-worship-decisions/components/submissions/fields/decision-documents-field';

export default class SearchSubmissionsShowRoute extends Route {
  @service store;

  constructor() {
    super(...arguments);

    registerFormField();
    registerDecisionDocumentsField();
  }

  model(params) {
    return this.store.findRecord('submission', params.id, {
      include: [
        'organization.classificatie',
        'organization.provincie',
        'form-data.types',
        'last-modifier',
      ].join(','),
    });
  }
}
