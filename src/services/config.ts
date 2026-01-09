export enum AccountBaseType {
  Deposit = 'deposit',
  Loan = 'loan',
}

export enum AccountType {
  Saving = 'saving',
  Checking = 'checking',
  CreditCard = 'credit-card',
  Loan = 'loan',
}

export const AccountTypeConfig = {
  [AccountType.Checking]: {
    name: 'Checking',
    theme: 'danger',
    icon: 'DollarSign',
  },
  [AccountType.Saving]: {
    name: 'Savings',
    theme: 'info',
    icon: 'PiggyBank',
  },
  [AccountType.CreditCard]: {
    name: 'Credit Cards',
    theme: 'secondary',
    icon: 'CreditCard',
  },
  [AccountType.Loan]: {
    name: 'Loans',
    theme: 'warning',
    icon: 'DollarSign',
  },
};

export const ApiAccountTypeConfig = {
  SAVINGS: AccountType.Saving,
  CHECKING: AccountType.Checking,
  LOAN: AccountType.Loan,
  CREDIT_CARD: AccountType.CreditCard,
};
