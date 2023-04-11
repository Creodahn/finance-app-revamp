import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class AccountListRowComponent extends Component {
  get account() {
    return this.args.account;
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
