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

export const getLatestActivities = createDraftSafeSelector(
  getState,
  (widget) => widget.latestActivities,
);

export const getDepositAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.depositAccounts,
);

export const getSelectedContact = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedContact,
);

export const getTransferFromAccount = createDraftSafeSelector(
  getState,
  (widget) => widget.transferFrom,
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

export const getCurrentView = createDraftSafeSelector(
  getState,
  (widget) => widget.currentView,
);
