import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

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

  @belongsTo('site', {
    async: true,
    inverse: null,
  })
  primarySite;

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

  get fullName() {
    return `${this.classificatie.get('label')} ${this.naam}`.trim();
  }
}
