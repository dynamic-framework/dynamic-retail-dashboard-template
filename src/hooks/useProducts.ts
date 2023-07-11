import { useEffect, useState } from 'react';
import { ProductRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProducts } from '../store/selectors';
import { setProducts, setSelectedProduct } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useProducts() {
  const [loading, setLoading] = useState(false);
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = ProductRepository.list();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        setLoading(false);
        dispatch(setProducts(data));
        dispatch(setSelectedProduct(data[0]));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();

    return () => {
      abort();
    };
  }, [dispatch]);

  return {
    loading,
    products,
  };
}
