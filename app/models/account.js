import { isEmpty } from '@ember/utils';
import Model, { attr } from '@ember-data/model';
import { modelValidator } from 'ember-model-validator';

const VALIDATIONS = {
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

@modelValidator
class AccountModel extends Model {
  validations = VALIDATIONS;

  @attr('number') balance;
  @attr('boolean') credit;
  @attr('number') interestRate;
  @attr('number') monthlyPayment;
  @attr('string') name;

  get canBePersisted() {
    return this.edited && isEmpty(this.errors);
  }

  get edited() {
    return Object.keys(this.changedAttributes()).length > 0;
  }

  get persisted() {
    return !!this.id && !this.edited;
  }
}

export default AccountModel;
