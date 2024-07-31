import Controller from '@ember/controller';
import { NotFoundError } from '@ember-data/adapter/error';

export default class ErrorController extends Controller {
  get error() {
    return this.model;
  }

  get isNotFoundError() {
    return this.error instanceof NotFoundError;
  }
}
