import Model, { attr } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('number') balance;
  @attr('boolean') credit;
  @attr('number') interestRate;
  @attr('number') monthlyPayment;
  @attr('string') name;
}
