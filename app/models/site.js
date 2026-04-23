import Model, { belongsTo, attr } from '@warp-drive/legacy/model';

export default class SiteModel extends Model {
  @attr siteTypeName;

  @belongsTo('address', {
    inverse: null,
    async: true,
  })
  address;
}
