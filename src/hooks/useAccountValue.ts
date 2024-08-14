import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountType } from '../services/config';
import type { Account } from '../services/interface';
import getAccountValue from '../services/utils/getAccountValue';
import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';

export default function useAccountValue(account: Account) {
  const { t } = useTranslation();

  const { format } = useFormatCurrency();
  const showBalances = useAppSelector(getShowBalances);

  const value = useMemo(() => (
    showBalances ? format(getAccountValue(account)) : '$ ***'
  ), [account, format, showBalances]);

  const label = useMemo(() => {
    if (account.type === AccountType.CreditCard) {
      return t('availableQuota');
    }
    if (account.type === AccountType.Loan) {
      return t('totalDue');
    }
    return t('amountAvailable');
  }, [account, t]);

  return {
    value,
    label,
  };
}
