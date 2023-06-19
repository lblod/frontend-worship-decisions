import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class SearchSubmissionsController extends Controller {
  @service router;
  @service currentSession;

  page = 0;
  size = 20;
  sort = 'organization.naam'; // Note : this is a temporary fix, clicking on the sorting will still make submissions disappear but now they're shown by default.

  @tracked preferences = false;

  get hasActiveChildRoute() {
    return (
      this.router.currentRouteName.startsWith('search.submissions') &&
      this.router.currentRouteName !== 'search.submissions.index'
    );
  }

  @action
  setFilter(key, value) {
    if (typeOf(value) === 'array') {
      this.filter[key] = value.join(',');
    } else {
      this.filter[key] = value;
    }
    this.updateQueryParams();
  }

  @action
  updateQueryParams() {
    this.filter.keys.forEach((key) => (key = this.filter[key]));
  }

  @action
  showPreferences() {
    this.preferences = true;
  }

  @action
  hidePreferences() {
    this.preferences = false;
  }
}
