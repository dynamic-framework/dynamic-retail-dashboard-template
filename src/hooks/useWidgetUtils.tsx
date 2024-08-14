import { useCallback } from 'react';

import { useAppDispatch } from '../store/hooks';
import {
  setActivateView,
} from '../store/slice';

export default function useWidgetUtils() {
  const dispatch = useAppDispatch();

  const navigateTo = useCallback((screen: string) => {
    dispatch(setActivateView(screen));
  }, [dispatch]);

  return {
    navigateTo,
  };
}
