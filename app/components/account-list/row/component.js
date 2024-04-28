import { action } from '@ember/object';
import { dasherize } from '@ember/string';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class AccountListRowComponent extends Component {
  @service alert;
  @service store;

  get account() {
    return this.args.account || this.store.createRecord('account');
  }

  get accountCanBePersisted() {
    return this.accountEdited && isEmpty(this.account.get('errors'));
  }

  get accountEdited() {
    return (
      (!this.account.isNew || this.accountPersisted) &&
      this.account.hasDirtyAttributes
    );
  }

  get accountPersisted() {
    return this.identifier !== 0;
  }

  get identifier() {
    return this.account?.id || 0;
  }

  @action
  async delete() {
    await this.account.destroyRecord();
    this.store.unloadRecord(this.account);
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
    this.account.validate();
  }
}
