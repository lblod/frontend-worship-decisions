import { task } from 'ember-concurrency';
import {
  formStoreToQueryParams,
  queryParamsToFormStore,
} from '../../utils/filter-form-helpers';
import SearchQueriesFormComponent from './form';

export const FILTER_FORM_UUID = 'e025a601-b50b-4abd-a6de-d0c3b619795c';

export default class SearchQueriesFilterFormComponent extends SearchQueriesFormComponent {
  constructor(owner, args) {
    super(FILTER_FORM_UUID, owner, args);
  }

  async setupForm(form) {
    await super.setupForm(form);
    this.loadQueryParams();
    this.registerObserver();
  }

  willDestroy() {
    this.formStore.deregisterObserver(FILTER_FORM_UUID);
  }

  // NOTE: the problem here lies in that if an outsider makes changes in the store,
  // the field components are not aware of this. There for, for now, we force the form to rerender by temporarily
  // changing the "show" argument.
  resetFilters = task(async () => {
    // We want to call the parent's setupForm method, and super isn't available in non-methods so we have to do something like this.
    // TODO: figure out why we are extending a different component in the first place..
    await SearchQueriesFormComponent.prototype.setupForm.call(
      this,
      FILTER_FORM_UUID,
    );
    this.updateQueryParams();
    this.registerObserver();
  });

  // INTERNAL LOGIC

  /**
   * Registers the necessary observer to allow the filter to work on change of the form-store.
   */
  registerObserver() {
    this.formStore.registerObserver(() => {
      this.updateQueryParams();
    }, FILTER_FORM_UUID);
  }

  /**
   * Will populate the form-store with the given query-parameters.
   */
  loadQueryParams() {
    queryParamsToFormStore(
      this.args.queryParams,
      this.formStore,
      this.sourceNode,
    );
  }

  updateQueryParams() {
    // TODO: maybe try improving this based on the received changes?
    const query = formStoreToQueryParams(this.formStore, this.sourceNode);
    this.router.transitionTo(query);
  }
}
