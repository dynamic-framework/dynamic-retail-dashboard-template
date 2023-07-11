import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Contact, Product } from '@modyo-dynamic/modyo-service-retail';

// eslint-disable-next-line @typescript-eslint/ban-types
export type WidgetState = {
  products: Array<Product>;
  showBalances: boolean;
  selectedProduct?: Product;
  selectedContact?: Contact;
};

const initialState = {
  products: [],
  showBalances: true,
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
    setShowBalances(state, action: PayloadAction<boolean>) {
      state.showBalances = action.payload;
    },
    setSelectedProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    setSelectedContact(state, action: PayloadAction<Contact>) {
      state.selectedContact = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  setProducts,
  setShowBalances,
  setSelectedProduct,
  setSelectedContact,
} = slice.actions;

export default slice.reducer;
