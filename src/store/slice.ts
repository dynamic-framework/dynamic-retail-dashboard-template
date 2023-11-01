import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Account, Contact, Activity } from '../services/interface';
import { View } from '../config/widgetConfig';

export type WidgetState = {
  accounts: Array<Account>;
  contacts: Array<Contact>;
  latestActivities: Array<Activity>;
  showBalances: boolean;
  currentView: View;
  selectedContact?: Contact;
  transferFrom?: Account;
  depositAccounts: Array<Account>;
};

const initialState = {
  accounts: [],
  contacts: [],
  depositAccounts: [],
  latestActivities: [],
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
    setLatestActivities(state, action: PayloadAction<Array<Activity>>) {
      state.latestActivities = action.payload;
    },
    setShowBalances(state, action: PayloadAction<boolean>) {
      state.showBalances = action.payload;
    },
    setCurrentView(state, action: PayloadAction<View>) {
      state.currentView = action.payload;
    },
    setSelectedContact(state, action: PayloadAction<Contact>) {
      state.selectedContact = action.payload;
    },
    setTransferFrom(state, action: PayloadAction<Account>) {
      state.transferFrom = action.payload;
    },
    setDepositAccounts(state, action: PayloadAction<Array<Account>>) {
      state.depositAccounts = action.payload;
    },
  },
});

export const {
  setAccounts,
  setContacts,
  setShowBalances,
  setCurrentView,
  setLatestActivities,
  setSelectedContact,
  setTransferFrom,
  setDepositAccounts,
} = slice.actions;

export default slice.reducer;
