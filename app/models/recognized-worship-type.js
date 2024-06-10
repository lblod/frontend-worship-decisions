import Model, { attr } from '@ember-data/model';

export default class RecognizedWorshipType extends Model {
  @attr uri;
  @attr label;
}