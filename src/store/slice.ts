import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Account, Contact, Activity } from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>;
  contacts: Array<Contact>;
  frequentActivities: Array<Activity>;
  showBalances: boolean;
  currentView: string;
};

const initialState = {
  accounts: [],
  contacts: [],
  frequentActivities: [],
  showBalances: true,
  currentView: 'list',
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
    setFrequentActivities(state, action: PayloadAction<Array<Activity>>) {
      state.frequentActivities = action.payload;
    },
    setShowBalances(state, action: PayloadAction<boolean>) {
      state.showBalances = action.payload;
    },
    setCurrentView(state, action: PayloadAction<string>) {
      state.currentView = action.payload;
    },
  },
});

export const {
  setAccounts,
  setContacts,
  setShowBalances,
  setCurrentView,
  setFrequentActivities,
} = slice.actions;

export default slice.reducer;
