import Model, { attr } from '@warp-drive/legacy/model';

export default class BestuursorgaanClassificatieCode extends Model {
  @attr() uri;
  @attr() label;
  @attr() scopeNote;
}
