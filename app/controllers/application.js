import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked accountName;

  @service store;

  @action
  addAccount(evt) {
    evt.preventDefault();
    let newAccount = this.store.createRecord('account', {
      name: this.accountName,
    });
    newAccount.save();
    this.accountName = '';
  }

  @action
  updateNewAccountName(name) {
    console.log(name);
    this.accountName = name;
  }
}
