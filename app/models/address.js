import Model, { belongsTo } from '@warp-drive/legacy/model';

export default class AddressModel extends Model {
  @belongsTo('concept', {
    inverse: null,
    async: true,
  })
  provincie;
}
