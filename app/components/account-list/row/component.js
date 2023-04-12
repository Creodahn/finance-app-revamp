import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class AccountListRowComponent extends Component {
  @service alert;
  @service store;

  get account() {
    return this.args.account || this.store.createRecord('account');
  }

  get accountEdited() {
    return this.account.hasDirtyAttributes;
  }

  get identifier() {
    return this.account?.id || 0;
  }

  @action
  save() {
    if (this.account.validate()) {
      this.account.save();
    } else {
      let message = this.account
        .get('errors')
        .map(
          ({ attribute, message }) =>
            `*\t${dasherize(attribute)
              .replace(/-/g, ' ')
              .toLowerCase()} ${message}\n\r`
        )
        .join('');

      this.alert.broadcast({
        level: 'error',
        message: `The account data provided is not valid:\n\r${message}`,
      });
    }
  }

  @action
  update(attr, value) {
    this.account[attr] = value;
  }
}
