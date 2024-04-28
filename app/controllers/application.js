import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked accountName;

  accountAttributes = [
    { name: 'name', type: 'text' },
    { name: 'interestRate', type: 'number' },
    { name: 'balance', type: 'number' },
    { name: 'monthlyPayment', type: 'number' },
  ];
}
