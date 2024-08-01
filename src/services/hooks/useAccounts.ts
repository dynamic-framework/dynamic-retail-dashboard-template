import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import { setAccounts, setDepositAccounts, setTransferFrom } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountBaseType } from '../config';
import { AccountRepository } from '../repositories';

export default function useAccounts() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const response = await AccountRepository.list({ abortSignal: abortController.signal });
        setLoading(false);
        dispatch(setAccounts(response));
        const depositAccounts = response.filter(
          (account) => account.baseType === AccountBaseType.Deposit,
        );
        dispatch(setDepositAccounts(depositAccounts));
        dispatch(setTransferFrom(depositAccounts[0]));
      } catch (error) {
        errorHandler(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return {
    loading,
    data,
  };
}
