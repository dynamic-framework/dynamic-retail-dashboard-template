/* eslint-disable max-len */
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getLatestActivities } from '../../store/selectors';
import { setLatestActivities } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { LatestActivitiesRepository } from '../repositories';

export default function useLatestActivities() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(getLatestActivities);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const response = await LatestActivitiesRepository.list({ abortSignal: abortController.signal });
        dispatch(setLatestActivities(response));
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
