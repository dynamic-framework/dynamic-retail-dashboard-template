import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { AccountTypeConfig } from '../services/config';

import type { RootState } from './store';
import type { Account, Category } from '../services/interface';

const getState = (state: RootState) => state.widget;

export const getAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.accounts,
);

export const getContacts = createDraftSafeSelector(
  getState,
  (widget) => widget.contacts,
);

export const getFirstAccount = createDraftSafeSelector(
  getAccounts,
  ([first]) => first,
);

export const getFirstContact = createDraftSafeSelector(
  getContacts,
  ([first]) => first,
);

export const getDepositAccounts = createDraftSafeSelector(
  getAccounts,
  (accounts) => accounts.filter((account) => account.baseType === 'deposit'),
);

export const getAccountsByCategory = createDraftSafeSelector(
  getAccounts,
  (data) => Object.values(
    data.reduce<Record<string, Category>>((categorized, account: Account) => {
      const {
        accounts = [],
        id = account.type,
        type = account.type,
        name = AccountTypeConfig[account.type].name,
      } = categorized[account.type] || {};

      return {
        ...categorized,
        [account.type]: {
          id,
          type,
          name,
          accounts: [...accounts, account],
        },
      };
    }, {}),
  ),
);

export const getShowBalances = createDraftSafeSelector(
  getState,
  (widget) => widget.showBalances,
);
