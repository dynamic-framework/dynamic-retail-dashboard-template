/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import { FrequentActivitiesRepository } from '../repositories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getFrequentActivities } from '../../store/selectors';
import { setFrequentActivities } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useFrequentActivities() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(getFrequentActivities);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const response = await FrequentActivitiesRepository.list({ abortSignal: abortController.signal });
        dispatch(setFrequentActivities(response));
        setLoading(false);
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
