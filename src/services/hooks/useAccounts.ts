import { useEffect, useState } from 'react';

import { AccountRepository } from '../repositories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import { setAccounts } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useAccounts() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = AccountRepository.list();

    (async () => {
      setLoading(true);
      try {
        const response = await perform();
        setLoading(false);
        dispatch(setAccounts(response));
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
    data,
  };
}
