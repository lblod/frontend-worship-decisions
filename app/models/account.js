import Model, { attr, belongsTo } from '@ember-data/model';

export default class Account extends Model {
  @attr() voId;
  @attr() provider;

  @belongsTo('gebruiker', {
    async: true,
    inverse: null,
  })
  gebruiker;
}
