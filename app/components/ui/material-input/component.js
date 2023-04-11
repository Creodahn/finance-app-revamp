import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MaterialInputComponent extends Component {
  @tracked value = this.args.value;

  @action
  update() {
    if (this.args.update) {
      this.args.update(this.value);
    } else {
      return;
    }
  }
}
