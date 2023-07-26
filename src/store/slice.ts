import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Account, Contact } from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>;
  contacts: Array<Contact>;
  showBalances: boolean;
};

const initialState = {
  accounts: [],
  contacts: [],
  showBalances: true,
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Array<Account>>) {
      state.accounts = action.payload;
    },
    setContacts(state, action: PayloadAction<Array<Contact>>) {
      state.contacts = action.payload;
    },
    setShowBalances(state, action: PayloadAction<boolean>) {
      state.showBalances = action.payload;
    },
  },
});

export const {
  setAccounts,
  setContacts,
  setShowBalances,
} = slice.actions;

export default slice.reducer;
