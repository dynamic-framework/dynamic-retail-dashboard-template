import { createDraftSafeSelector } from '@reduxjs/toolkit';
import {
  CategoriesConfig,
} from '@modyo-dynamic/modyo-service-retail';
import type {
  Product,
  ProductCategory,
} from '@modyo-dynamic/modyo-service-retail';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getProducts = createDraftSafeSelector(
  getState,
  (widget) => widget.products,
);

export const getDepositProducts = createDraftSafeSelector(
  getProducts,
  (products) => products.filter((product) => product.queryType === 'deposit'),
);

export const getProductsByCategory = createDraftSafeSelector(
  getProducts,
  (data) => Object.values(
    data.reduce((categorized, product: Product) => {
      const category = categorized[product.type];
      const { products = [] } = category;
      return {
        ...categorized,
        [product.type]: {
          ...category,
          products: [
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            ...products,
            product,
          ],
        },
      };
    }, CategoriesConfig),
  ) as Array<ProductCategory>,
);

export const getSelectedProduct = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedProduct,
);

export const getShowBalances = createDraftSafeSelector(
  getState,
  (widget) => widget.showBalances,
);

export const getSelectedContact = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedContact,
);
