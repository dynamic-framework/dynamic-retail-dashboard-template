import { useEffect, useState } from 'react';

import { ContactRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { getSelectedContact } from '../store/selectors';

import errorHandler from '../utils/errorHandler';
import { setSelectedContact } from '../store/slice';

export default function useContacts() {
  const [loading, setLoading] = useState(false);
  const selectedContact = useAppSelector(getSelectedContact);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = ContactRepository.list();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setSelectedContact(data[2]));
        setLoading(false);
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
    selectedContact,
  };
}
