import * as DynamicFramework from '@dynamic-framework/ui-react';
import {
  render,
  waitFor,
} from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';

import App from '../src/App';
import { CONTEXT_CONFIG } from '../src/config/widgetConfig';
import store from '../src/store/store';

const mockStore = {
  accounts: [],
  contacts: [],
  depositAccounts: [],
  showBalances: true,
  currentView: 'list',
  activateView: 'start',
  selectedContact: undefined,
  transferFrom: undefined,
  pinActivateAccount: undefined,
};

jest.mock('@dynamic-framework/ui-react', () => {
  const originalModule: typeof DynamicFramework = jest.requireActual('@dynamic-framework/ui-react');
  return {
    ...originalModule,
    useDContext: jest.fn(),
    useDPortalContext: jest.fn(() => (
      {
        openPortal: jest.fn(),
        closePortal: jest.fn(),
      }
    )),
    DSelect: jest.fn(),
  };
});

jest.mock('../src/store/selectors', () => ({
  getAccounts: jest.fn(() => mockStore.accounts),
  getContacts: jest.fn(() => mockStore.contacts),
  getDepositAccounts: jest.fn(() => mockStore.depositAccounts),
  getSelectedContact: jest.fn(() => mockStore.selectedContact),
  getTransferFromAccount: jest.fn(() => mockStore.transferFrom),
  getAccountsByCategory: jest.fn(() => mockStore.accounts),
  getShowBalances: jest.fn(() => mockStore.showBalances),
  getCurrentView: jest.fn(() => mockStore.currentView),
  getPinActivateAccount: jest.fn(() => mockStore.pinActivateAccount),
  getActivationView: jest.fn(() => mockStore.activateView),
}));

describe('App Component', () => {
  beforeEach(() => {
    (DynamicFramework.useDContext as jest.Mock).mockReturnValue({
      setContext: jest.fn(),
    });
  });
  it('sets context with correct configuration', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    await waitFor(() => {
      expect(DynamicFramework.useDContext().setContext).toHaveBeenCalledWith(CONTEXT_CONFIG);
    });
  });
});
