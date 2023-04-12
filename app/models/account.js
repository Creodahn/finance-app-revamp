import Model, { attr } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

@modelValidator
class AccountModel extends Model {
  @attr('number') balance;
  @attr('boolean') credit;
  @attr('number') interestRate;
  @attr('number') monthlyPayment;
  @attr('string') name;

  validations = {
    name: {
      presence: true,
    },
    interestRate: {
      presence: true,
    },
    monthlyPayment: {
      presence: true,
    },
    balance: {
      presence: true,
    },
  };
}

export default AccountModel;
