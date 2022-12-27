import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SearchIndexRoute extends Route {
  @service router;
  @service currentSession;

  beforeModel(/* transition */) {
    this.router.transitionTo('search.submissions');
  }
}
