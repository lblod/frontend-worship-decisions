import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { autofocus } from '../../modifiers/auto-focus';

export default class NotificationPreferencesComponent extends Component {
  @service currentSession;

  @tracked wilMailOntvangen = this.currentSession.group.wilMailOntvangen;
  @tracked emailAddress = this.currentSession.group.mailAdres;

  autofocus = autofocus;

  @action
  handleEmailChange(event) {
    this.emailAddress = event.target.value.trim();
  }

  @action
  savePreferences(event) {
    event.preventDefault();

    let group = this.currentSession.group;
    group.mailAdres = this.emailAddress;
    group.wilMailOntvangen = this.wilMailOntvangen;
    group.save();

    this.args.close();
  }
}
