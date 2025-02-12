import { AccountBaseType, AccountType } from './config';

export type Contact = {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
};

export type Category = {
  id: string;
  name: string;
  type: AccountType;
  accounts: Array<Account>;
};

export type Metadata = {
  page: number;
  rows: number;
  totalPages: number;
  totalRows: number;
};

export type BaseAccount<T extends AccountBaseType> = {
  id: string;
  name: string;
  accountNumber: string;
  type: AccountType;
  baseType: T;
};

export type DepositAccount = BaseAccount<AccountBaseType.Deposit> & {
  balanceAvailable: number;
};

export type LoanAccount = BaseAccount<AccountBaseType.Loan> & {
  balanceOwed: number;
  balanceRemaining: number;
};

export type Account = DepositAccount | LoanAccount;
