import { useEffect, useState } from 'react';

import { ContactRepository } from '../repositories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getContacts } from '../../store/selectors';
import { setContacts } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useContacts() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = ContactRepository.list();

    (async () => {
      setLoading(true);
      try {
        const response = await perform();
        setLoading(false);
        dispatch(setContacts(response));
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
