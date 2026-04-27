import Model, { attr, belongsTo, hasMany } from '@warp-drive/legacy/model';

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

  /* eslint-disable-next-line warp-drive/no-invalid-resource-types -- it incorrectly flags this type and wants to replace it with `form-datum` */
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
