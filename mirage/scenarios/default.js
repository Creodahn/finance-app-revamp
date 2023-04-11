export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  // server.createList('post', 10);
  let accounts = [
    {
      name: 'A1',
      interestRate: 0,
      balance: 1159.32,
      monthlyPayment: 115.93,
      credit: true,
    },
    {
      name: 'A2',
      interestRate: 25.99,
      balance: 724.12,
      monthlyPayment: 724.12,
      credit: true,
    },
    {
      name: 'A3',
      interestRate: 4.99,
      balance: 63726.89,
      monthlyPayment: 1200.74,
      credit: false,
    },
    {
      name: 'C1',
      interestRate: 0,
      balance: 4700,
      monthlyPayment: 800,
      credit: true,
    },
    {
      name: 'C2',
      interestRate: 15.24,
      balance: 1427.31,
      monthlyPayment: 500,
      credit: true,
    },
    {
      name: 'C3',
      interestRate: 16.24,
      balance: 0,
      monthlyPayment: 0,
      credit: true,
    },
    {
      name: 'C4',
      interestRate: 0,
      balance: 9901.01,
      monthlyPayment: 300,
      credit: true,
    },
    {
      name: 'D1',
      interestRate: 0,
      balance: 9084,
      monthlyPayment: 550,
      credit: true,
    },
    {
      name: 'L1',
      interestRate: 0,
      balance: 1348,
      monthlyPayment: 330,
      credit: true,
    },
    {
      name: 'M1',
      interestRate: 4.85,
      balance: 395000,
      monthlyPayment: 2917.59,
      credit: false,
    },
  ];

  accounts.forEach((data) => server.create('account', data));
}
