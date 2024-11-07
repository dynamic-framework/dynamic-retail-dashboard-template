import { AccountType } from '../services/config';
import liquidParser from '../utils/liquidParser';

export const SITE_LANG = liquidParser.parse('{{site.language}}');
export const SITE_URL = liquidParser.parse('{{site.url}}');
const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

export const USER_FIRST_NAME = liquidParser.parse('{{user.first_name}}');

export const API_ACCOUNT_LIST_FILTER = liquidParser.parse('{{vars.account-list-filter}}');

const TRANSFER_PATH = liquidParser.parse('{{vars.transfers-path}}');
const PAYMENTS_PATH = liquidParser.parse('{{vars.payments-path}}');
const INVESTMENT_PATH = liquidParser.parse('{{vars.investment-path}}');

export const TRANSFER_URL = `${SITE_URL}/${TRANSFER_PATH}`;
export const PAYMENTS_URL = `${SITE_URL}/${PAYMENTS_PATH}`;
export const INVESTMENT_URL = `${SITE_URL}/${INVESTMENT_PATH}`;

const ACCOUNT_PATH_SAVING = liquidParser.parse('{{vars.account-path-saving}}');
const ACCOUNT_PATH_CHECKING = liquidParser.parse('{{vars.account-path-checking}}');
const ACCOUNT_PATH_CREDIT_CARD = liquidParser.parse('{{vars.account-path-credit-card}}');
const ACCOUNT_PATH_LOAN = liquidParser.parse('{{vars.account-path-loan}}');

export const ACCOUNT_PATHS = {
  [AccountType.Saving]: ACCOUNT_PATH_SAVING,
  [AccountType.Checking]: ACCOUNT_PATH_CHECKING,
  [AccountType.CreditCard]: ACCOUNT_PATH_CREDIT_CARD,
  [AccountType.Loan]: ACCOUNT_PATH_LOAN,
};

export const DEFAULT_NAME = 'John';

export const SCREENS = {
  start: 'start',
  activation: 'activation',
  createPin: 'createPin',
  confirmPin: 'confirmPin',
};

export type View = 'list' | 'slides';

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
};
