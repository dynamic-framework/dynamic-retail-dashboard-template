import { createSelector } from '@reduxjs/toolkit';

import { AccountTypeConfig } from '../services/config';
import type { Account, Category } from '../services/interface';

import type { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getAccounts = createSelector(
  getState,
  (widget) => widget.accounts,
);

export const getContacts = createSelector(
  getState,
  (widget) => widget.contacts,
);

export const getLatestActivities = createSelector(
  getState,
  (widget) => widget.latestActivities,
);

export const getDepositAccounts = createSelector(
  getState,
  (widget) => widget.depositAccounts,
);

export const getSelectedContact = createSelector(
  getState,
  (widget) => widget.selectedContact,
);

export const getTransferFromAccount = createSelector(
  getState,
  (widget) => widget.transferFrom,
);

export const getAccountsByCategory = createSelector(
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

export const getShowBalances = createSelector(
  getState,
  (widget) => widget.showBalances,
);

export const getCurrentView = createSelector(
  getState,
  (widget) => widget.currentView,
);

export const getPinActivateAccount = createSelector(
  getState,
  (widget) => widget.pinActivateAccount,
);

export const getActivationView = createSelector(
  getState,
  (widget) => widget.activateView,
);
