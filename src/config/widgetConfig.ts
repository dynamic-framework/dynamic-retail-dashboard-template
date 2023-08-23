import { liquidParser } from '@dynamic-framework/ui-react';

import { AccountType } from '../services/config';

export const SITE_URL = liquidParser.parse('{{site.url}}');
export const TRANSFER_PATH = liquidParser.parse('{{vars.transfers-path}}');
export const TRANSFER_URL = `${SITE_URL}/${TRANSFER_PATH}`;

export const ACCOUNT_PATH_SAVING = liquidParser.parse('{{vars.account-path-saving}}');
export const ACCOUNT_PATH_CHECKING = liquidParser.parse('{{vars.account-path-checking}}');
export const ACCOUNT_PATH_CREDIT_CARD = liquidParser.parse('{{vars.account-path-credit-card}}');
export const ACCOUNT_PATH_LOAN = liquidParser.parse('{{vars.account-path-loan}}');

export const ACCOUNT_PATHS = {
  [AccountType.Saving]: ACCOUNT_PATH_SAVING,
  [AccountType.Checking]: ACCOUNT_PATH_CHECKING,
  [AccountType.CreditCard]: ACCOUNT_PATH_CREDIT_CARD,
  [AccountType.Loan]: ACCOUNT_PATH_LOAN,
};

export const FORMAT_DATE = liquidParser.parse('{{vars.format-date}}');
export const FORMAT_DATE_FULL = liquidParser.parse('{{vars.format-date-full}}');
