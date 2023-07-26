import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';
import { setShowBalances } from '../store/slice';

export default function useToggleBalances() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const showBalances = useAppSelector(getShowBalances);

  const data = useMemo(() => {
    if (showBalances) {
      return {
        label: t('balance.hide'),
        icon: 'eye-slash',
      };
    }
    return {
      label: t('balance.show'),
      icon: 'eye',
    };
  }, [showBalances, t]);

  const callback = () => {
    dispatch(setShowBalances(!showBalances));
  };

  return {
    data,
    callback,
  };
}
