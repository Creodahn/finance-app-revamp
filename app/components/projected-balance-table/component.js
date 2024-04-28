import Component from '@glimmer/component';
import { MONTH_NAMES } from 'finance-app-revamp/utils/months';
import {
  initializeArray,
  sumArray,
} from 'finance-app-revamp/utils/array-manipulation';
import { tracked } from '@glimmer/tracking';

const NUMBER_OF_MONTHS = 12;
const MONTHLY_INCOME = 9300;

function formatAmt(amt) {
  return parseFloat(amt || '0');
}

export default class ProjectedBalanceTableComponent extends Component {
  monthNames = MONTH_NAMES;

  @tracked numberOfMonths = NUMBER_OF_MONTHS;

  get accounts() {
    return this.args.model;
  }

  get months() {
    let year = new Date().getFullYear();
    let months = [];
    let numberOfYears = 0;
    let monthOffset = new Date().getMonth();

    for (let i = 0; i < this.numberOfMonths; i++) {
      let month = monthOffset + i - 12 * numberOfYears;

      if (month === 12) {
        numberOfYears++;
        month -= 12;
      }

      months.push(`${this.monthNames[month]} ${year + numberOfYears}`);
    }

    return months;
  }

  get accountsByMonth() {
    let { accounts } = this;

    return accounts?.filterBy('name').map((account) => {
      return this.#calculateMonthlyData(account);
    });
  }

  get creditAccountsByMonth() {
    return this.accountsByMonth?.filterBy('isCredit');
  }

  get overallTotal() {
    return sumArray(this.totalsByMonth);
  }

  get overallCreditTotal() {
    return sumArray(this.totalCreditPaymentsByMonth);
  }

  get totalCreditPaymentsByMonth() {
    return this.#calculateAccountTotalsByField(
      this.creditAccountsByMonth,
      'monthlyPayments'
    );
  }

  get totalsByMonth() {
    return this.#calculateAccountTotalsByField(
      this.accountsByMonth,
      'monthlyPayments'
    );
  }

  get totalDifferenceByMonth() {
    let differences = [];
    let previous = null;

    this.totalsByMonth.forEach((total) => {
      if (previous) {
        differences.push(previous - total);
      } else {
        differences.push(0);
      }
      previous = total;
    });

    return differences;
  }

  get monthlyRemainingIncome() {
    return this.totalsByMonth?.map((total) => MONTHLY_INCOME - total);
  }

  get totalCreditDebtByMonth() {
    return this.#calculateAccountTotalsByField(
      this.creditAccountsByMonth,
      'monthlyBalances'
    );
  }

  get totalDebtByMonth() {
    return this.#calculateAccountTotalsByField(this.accountsByMonth, 'balance');
  }

  get totalRemainingIncome() {
    return sumArray(this.monthlyRemainingIncome);
  }

  #calculateAccountTotalsByField(accounts, field) {
    let totals = initializeArray(this.numberOfMonths);

    accounts?.forEach((account) => {
      account[field]?.forEach((amount, index) => {
        totals[index] += amount || 0;
      });
    });

    return totals;
  }

  #calculateBalance({ balance, interestRate, monthlyPayment }, payments) {
    let pmtsSoFar = payments.length;
    let beginningBalance =
      (pmtsSoFar > 0 ? payments[pmtsSoFar - 1] : balance) -
      formatAmt(monthlyPayment);
    let interest = this.#calculateInterestAmount(
      beginningBalance,
      interestRate
    );
    let newBalance = beginningBalance + interest;

    return newBalance < 0 ? 0 : newBalance;
  }

  #calculateBalancePerMonth(account) {
    let paymentsArray = [account.balance];

    for (let i = this.numberOfMonths - 1; i > 0; i--) {
      paymentsArray.push(this.#calculateBalance(account, paymentsArray));
    }

    return paymentsArray;
  }

  #calculateInterestAmount(balance, rate) {
    return (balance * (rate / 100)) / this.numberOfMonths;
  }

  #calculateMonthlyData(account) {
    let monthlyBalances = this.#calculateBalancePerMonth(account);
    let monthlyPayments = this.#calculateMonthlyPayments(
      account,
      monthlyBalances
    );

    return {
      name: account.name,
      isCredit: account.credit,
      monthlyBalances,
      monthlyPayments,
      totalPayments: monthlyPayments.reduce((total, current) => {
        return formatAmt(total) + formatAmt(current);
      }),
    };
  }

  #calculateMonthlyPayments({ monthlyPayment }, monthlyBalances = []) {
    return monthlyBalances.map((balance) => {
      let pmt = formatAmt(monthlyPayment);
      let diff = balance - pmt;
      return diff < 0 ? balance : pmt;
    });
  }
}
