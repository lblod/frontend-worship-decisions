import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ContactFormComponent extends Component {
  @tracked selectedOption = null;

  subjectOptions = [
    {
      label: 'Een functionaliteit, bug of probleem',
      subject: 'Functionaliteit, bug of probleem',
    },
    {
      label: 'Een inhoudelijke vraag',
      subject: 'Inhoudelijke vraag',
    },
  ];

  get canSend() {
    return Boolean(this.selectedOption);
  }

  get mailto() {
    if (this.canSend) {
      let subject = this.selectedOption.subject;

      return `mailto:LoketLokaalBestuur@vlaanderen.be?subject=${subject} - Publieke besluitendatabank`;
    } else {
      return '';
    }
  }
}
