import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Bestuurseenheid extends Model {
  @attr() naam;
  @attr('string-set') alternatieveNaam;
  @attr() mailAdres;
  @attr() wilMailOntvangen;

  @belongsTo('werkingsgebied', {
    async: true,
    inverse: null,
  })
  werkingsgebied;
  @belongsTo('werkingsgebied', {
    async: true,
    inverse: null,
  })
  provincie;
  @belongsTo('bestuurseenheid-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;
  @hasMany('bestuursorgaan', {
    async: true,
    inverse: null,
  })
  bestuursorganen;
  @belongsTo('recognized-worship-type', {
    async: true,
    inverse: null,
    optional: true,
  })
  recognizedWorshipType;

  get fullName() {
    return `${this.classificatie.get('label')} ${this.naam}`.trim();
  }
}
