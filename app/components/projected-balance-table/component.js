import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const NUMBER_OF_MONTHS = 12;
const MONTHLY_INCOME = 9300;

export default class ProjectedBalanceTableComponent extends Component {
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
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

    return accounts.map((account) => {
      return this.calculateMonthlyData(account);
    });
  }

  get creditAccountsByMonth() {
    return this.accountsByMonth.filterBy('isCredit');
  }

  get overallTotal() {
    return this.sumArray(this.totalsByMonth);
  }

  get overallCreditTotal() {
    return this.sumArray(this.totalCreditPaymentsByMonth);
  }

  get totalCreditPaymentsByMonth() {
    let totals = this.initializeTotalArray();

    this.creditAccountsByMonth.forEach((account) => {
      account.monthlyPayments.forEach((payment, index) => {
        totals[index] += payment;
      });
    });

    return totals;
  }

  get totalsByMonth() {
    let totals = this.initializeTotalArray();

    this.accountsByMonth.forEach((account) => {
      account.monthlyPayments.forEach((payment, index) => {
        totals[index] += payment;
      });
    });

    return totals;
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
    return this.totalsByMonth.map((total) => MONTHLY_INCOME - total);
  }

  get totalCreditDebtByMonth() {
    let totalDebtByMonth = this.initializeTotalArray();

    this.creditAccountsByMonth.forEach((account) => {
      account.monthlyBalances.forEach((balance, index) => {
        totalDebtByMonth[index] += balance;
      });
    });

    return totalDebtByMonth;
  }

  get totalDebtByMonth() {
    let totalDebtByMonth = this.initializeTotalArray();

    this.accountsByMonth.forEach((account) => {
      account.monthlyBalances.forEach((balance, index) => {
        totalDebtByMonth[index] += balance;
      });
    });

    return totalDebtByMonth;
  }

  get totalRemainingIncome() {
    return this.sumArray(this.monthlyRemainingIncome);
  }

  calculateBalance({ balance, interestRate, monthlyPayment = 0 }, payments) {
    let pmtsSoFar = payments.length;
    let beginningBalance =
      (pmtsSoFar > 0 ? payments[pmtsSoFar - 1] : balance) -
      parseFloat(monthlyPayment);
    let interest = this.calculateInterestAmount(beginningBalance, interestRate);
    let newBalance = beginningBalance + interest;

    return newBalance < 0 ? 0 : newBalance;
  }

  calculateInterestAmount(balance, rate) {
    return (balance * (rate / 100)) / this.numberOfMonths;
  }

  calculateBalancePerMonth(account) {
    let paymentsArray = [account.balance];

    for (let i = this.numberOfMonths - 1; i > 0; i--) {
      paymentsArray.push(this.calculateBalance(account, paymentsArray));
    }

    return paymentsArray;
  }

  calculateMonthlyData(account) {
    let monthlyBalances = this.calculateBalancePerMonth(account);
    let monthlyPayments = this.calculateMonthlyPayments(
      account,
      monthlyBalances
    );

    return {
      name: account.name,
      isCredit: account.credit,
      monthlyBalances,
      monthlyPayments,
      totalPayments: monthlyPayments.reduce((total, current) => {
        return parseFloat(total) + parseFloat(current);
      }),
    };
  }

  calculateMonthlyPayments({ monthlyPayment }, monthlyBalances) {
    return monthlyBalances.map((balance) => {
      let diff = balance - monthlyPayment;
      return diff < 0 ? balance : parseFloat(monthlyPayment);
    });
  }

  initializeTotalArray() {
    return Array.apply(null, Array(this.numberOfMonths)).map(() => 0);
  }

  sumArray(array) {
    return array.reduce((total, current) => total + current);
  }
}
