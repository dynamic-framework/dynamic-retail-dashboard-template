import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';

import type { Account } from '../services/interface';
import getAccountValue from '../services/utils/getAccountValue';
import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';

export default function useAccountValue(account: Account) {
  const { format } = useFormatCurrency();
  const showBalances = useAppSelector(getShowBalances);

  const value = useMemo(() => (
    showBalances ? format(getAccountValue(account)) : '$ ***'
  ), [account, format, showBalances]);

  return {
    value,
  };
}
