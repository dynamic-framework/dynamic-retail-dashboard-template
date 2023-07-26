import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormatCurrency } from '@dynamic-framework/ui-react';

import getAccountValue from '../services/utils/getAccountValue';
import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';

import type { Account } from '../services/interface';

export default function useAccountValue(account: Account) {
  const { t } = useTranslation();

  const { format } = useFormatCurrency();
  const showBalances = useAppSelector(getShowBalances);

  const value = useMemo(() => (
    showBalances ? format(getAccountValue(account)) : '$ ***'
  ), [account, format, showBalances]);

  const label = useMemo(() => {
    if (account.type === 'credit-card') {
      return t('available-quota');
    }
    if (account.type === 'loan') {
      return t('total-due');
    }
    return t('amount-available');
  }, [account, t]);

  return {
    value,
    label,
  };
}
