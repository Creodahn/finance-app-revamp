import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  async model() {
    let accounts = await this.store.findAll('account');
    let newAccount = this.store.createRecord('account');

    newAccount.validate();

    return [...accounts.toArray(), newAccount];
  }
}
