import Model, { attr } from '@warp-drive/legacy/model';

export default class ChartOfAccountModel extends Model {
  @attr label;
  @attr notation;
}
