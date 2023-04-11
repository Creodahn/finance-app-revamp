import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UiToggleComponent extends Component {
  @tracked
  on = false;

  constructor(owner, args) {
    super(owner, args);

    if (this.args.on) {
      this.on = this.args.on;
    }
  }

  @action
  toggleState() {
    this.on = !this.on;

    if (this.args.toggleHandler) {
      this.args.toggleHandler(this.args.id, this.on);
    }
  }
}
