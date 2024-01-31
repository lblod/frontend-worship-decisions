import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Submission extends Model {
  @attr('datetime', {
    defaultValue() {
      return new Date();
    },
  })
  created;
  @attr('datetime', {
    defaultValue() {
      return new Date();
    },
  })
  modified;
  @attr('datetime') sentDate;
  @attr('datetime') receivedDate;
  @attr source;
  @attr uri;
  @attr href;
  @belongsTo('form-data', {
    async: true,
    inverse: null,
  })
  formData;
  @belongsTo('bestuurseenheid', {
    async: true,
    inverse: null,
  })
  organization;
  @belongsTo('submission-document', {
    async: true,
    inverse: null,
  })
  submissionDocument;
  @hasMany('file', {
    async: true,
    inverse: null,
  })
  files;
}
