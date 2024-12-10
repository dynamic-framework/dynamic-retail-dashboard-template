import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getContacts } from '../../store/selectors';
import { setContacts, setSelectedContact } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { ContactRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useContactsEffect() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const response = await ContactRepository.list({
          config: {
            abortSignal: abortController.signal,
          },
        });
        setLoading(false);
        dispatch(setContacts(response));
        dispatch(setSelectedContact(response[0]));
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
