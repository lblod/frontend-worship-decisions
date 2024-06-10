import { isEmpty } from '@ember/utils';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import search from '../../utils/mu-search';
import Snapshot from '../../utils/snapshot';
import { tracked } from '@glimmer/tracking';
import { getQueryParams } from '../../utils/filter-form-helpers';
import { inject as service } from '@ember/service';

export default class SearchSubmissionsRoute extends Route {
  @service store;
  @tracked filter;

  queryParams;

  constructor() {
    super(...arguments);
    const options = { refreshModel: true };
    this.queryParams = getQueryParams(options);
    this.queryParams['page'] = options;
    this.queryParams['size'] = options;
    this.queryParams['sort'] = options;
    this.lastParams = new Snapshot();

    // TODO: Check if the user is linked to an organization that should use mu-search instead of mu-cl-resources
    // For now we default to mu-cl-resources
    this.shouldUseMuSearch = false;
  }

  async model(params) {
    this.filter = params;
    this.lastParams.stageLive(params);

    if (
      this.lastParams.anyFieldChanged(
        Object.keys(params).filter((key) => key !== 'page')
      )
    ) {
      params.page = 0;
    }

    if (this.shouldUseMuSearch) {
      return this.muSearch(params);
    } else {
      return this.search(params);
    }
  }

  async search(params) {
    const query = {
      'page[number]': params.page,
    };

    query.sort = params.sort
      ? params.sort
      : '-form-data.session-started-at-time';

    // TODO generate this based on form configuration?
    if (!isEmpty(params.search)) query[`filter`] = params.search;

    if (params.administrativeUnites)
      query['filter[organization][:uri:]'] = params.administrativeUnites;

    if (params.administrativeUnitClassifications) {
      query['filter[organization][classificatie][:uri:]'] =
        params.administrativeUnitClassifications;

      if (params.typeEredienst) {
        query[
          'filter[organization][recognized-worship-type][:uri:]'
        ] = params.typeEredienst;
      }
    }

    if (params.provinces)
      query['filter[organization][provincie][:uri:]'] = params.provinces;

    if (params.decisionTypes) {
      query['filter[form-data][decision-type][:uri:]'] = params.decisionTypes;

      if (params.regulationTypes)
        query['filter[form-data][regulation-type][:uri:]'] =
          params.regulationTypes;
    }

    if (params.sessionDateTime) {
      const sessionDate = new Date(params.sessionDateTime);
      const formattedDate = sessionDate.toISOString().split('T')[0];
      query['filter[form-data][session-started-at-time]'] = formattedDate;
    }

    if (params.sessionDateFrom)
      query['filter[form-data][:gte:session-started-at-time]'] =
        params.sessionDateFrom;

    if (params.sessionDateTo)
      query['filter[form-data][:lte:session-started-at-time]'] =
        params.sessionDateTo;

    this.lastParams.commit();

    return await this.store.query('submission', query);
  }

  async muSearch(params) {
    const query = {};
    // TODO generate this based on form configuration?
    if (!isEmpty(params.search)) query[`:sqs:data.content`] = params.search;
    if (params.administrativeUnites)
      query[':terms:administrativeUnitURI'] = params.administrativeUnites;
    if (params.administrativeUnitClassifications) {
      query[':terms:administrativeUnitClassificationURI'] =
        params.administrativeUnitClassifications;
      if (params.typeEredienst)
        query[':terms:typeEredienstURI'] =
          params.typeEredienst;
    }
    if (params.chartOfAccounts)
      query[':terms:chartOfAccountURI'] = params.chartOfAccounts;
    if (params.taxType) query[':terms:taxTypeURI'] = params.taxType;
    if (params.provinces) query[':terms:provinceURI'] = params.provinces;
    if (params.decisionTypes) {
      query[':terms:documentTypeURI'] = params.decisionTypes;
      if (params.regulationTypes)
        query[':terms:regulationTypeURI'] = params.regulationTypes;
    }
    if (params.sessionDateTime) {
      const sessionDate = new Date(params.sessionDateTime);
      const formattedDate = sessionDate.toISOString().split('T')[0];
      query['sessionDatetime'] = formattedDate;
    }
    if (params.sessionDateFrom)
      query[':gte:sessionDatetime'] = params.sessionDateFrom;
    if (params.sessionDateTo)
      query[':lte:sessionDatetime'] = params.sessionDateTo;
    if (params.sentDateFrom) query[':gte:sentDate'] = params.sentDateFrom;
    if (params.sentDateTo) query[':lte:sentDate'] = params.sentDateTo;
    if (params.dateOfEntryIntoForceFrom)
      query[':gte:dateOfEntryIntoForce'] = params.dateOfEntryIntoForceFrom;
    if (params.dateOfEntryIntoForceTo)
      query[':lte:dateOfEntryIntoForce'] = params.dateOfEntryIntoForceTo;
    if (params.dateNoLongerInForceFrom)
      query[':gte:dateNoLongerInForce'] = params.dateNoLongerInForceFrom;
    if (params.dateNoLongerInForceTo)
      query[':lte:dateNoLongerInForce'] = params.dateNoLongerInForceTo;

    this.lastParams.commit();

    return await search(
      '/search/submissions',
      params.page,
      params.size,
      params.sort ? params.sort : '-sessionDatetime',
      query,
      function (item) {
        item.attributes.id = item.id;
        return item.attributes;
      }
    );
  }

  setupController(controller) {
    super.setupController(...arguments);

    controller.usesMuSearch = this.shouldUseMuSearch;

    if (controller.page !== this.lastParams.committed.page)
      controller.set('page', this.lastParams.committed.page);

    if (controller.filter !== this.filter)
      controller.set('filter', this.filter);
  }

  @action
  loading(/* transition, origin */) {
    // Cancel default loading template
    return;
  }
}
