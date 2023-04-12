import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class AccountListRowComponent extends Component {
  @service store;

  get account() {
    return this.args.account || this.store.createRecord('account');
  }

  get identifier() {
    return this.account?.id || 0;
  }

  @action
  updateInterestRate(newRate) {
    this.account.interestRate = newRate;

    this.account.save();
  }

  @action
  updateBalance(newBalance) {
    this.account.balance = newBalance;

    this.account.save();
  }

  @action
  updateMonthlyPayment(newpayment) {
    this.account.monthlyPayment = newpayment;

    this.account.save();
  }
}
