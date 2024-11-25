import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import {
  setAccounts,
  setDepositAccounts,
  setTransferFrom,
} from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountBaseType } from '../config';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useAccounts() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { content } = await AccountRepository.list({
          config: {
            abortSignal: abortController.signal,
          },
        });
        setLoading(false);
        dispatch(setAccounts(content));
        const depositAccounts = content.filter(
          (account) => account.baseType === AccountBaseType.Deposit,
        );
        dispatch(setDepositAccounts(depositAccounts));
        dispatch(setTransferFrom(depositAccounts[0]));
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

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
