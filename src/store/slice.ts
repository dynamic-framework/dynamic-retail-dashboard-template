import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { View, SCREENS } from '../config/widgetConfig';
import type { Account, Contact, Activity } from '../services/interface';

export type WidgetState = {
  accounts: Array<Account>;
  contacts: Array<Contact>;
  latestActivities: Array<Activity>;
  showBalances: boolean;
  currentView: View;
  selectedContact?: Contact;
  transferFrom?: Account;
  pinActivateAccount?: string;
  depositAccounts: Array<Account>;
  activateView: string;
};

const initialState = {
  accounts: [],
  contacts: [],
  depositAccounts: [],
  latestActivities: [],
  showBalances: true,
  currentView: 'list',
  activateView: SCREENS.start,
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
    setActivateView(state, action: PayloadAction<string>) {
      state.activateView = action.payload;
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
    setPinActivateAccount(state, action: PayloadAction<string>) {
      state.pinActivateAccount = action.payload;
    },
  },
});

export const {
  setAccounts,
  setContacts,
  setActivateView,
  setPinActivateAccount,
  setShowBalances,
  setCurrentView,
  setLatestActivities,
  setSelectedContact,
  setTransferFrom,
  setDepositAccounts,
} = slice.actions;

export default slice.reducer;
