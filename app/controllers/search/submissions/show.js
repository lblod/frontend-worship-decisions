import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SearchSubmissionsShowController extends Controller {
  @action
  onCloseComponent() {
    this.router.transitionTo('search.submissions.index');
  }
}
