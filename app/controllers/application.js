import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked accountName;

  accountAttributes = ['name', 'interestRate', 'balance', 'monthlyPayment'];
}
