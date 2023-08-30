import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DInputCurrency, useFormatCurrency } from '@dynamic-framework/ui-react';

import type { Dispatch, SetStateAction } from 'react';

import getAccountValue from '../services/utils/getAccountValue';

import type { Account } from '../services/interface';

type Props = {
  value?: number;
  onChange: Dispatch<SetStateAction<number | undefined>>;
  account: Account;
};

export default function QuickTransferAmountInput({ value, onChange, account }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  const hintCurrency = useMemo(() => {
    if (value === 0 || !account) {
      return {
        message: t('hint.noAmount'),
        icon: 'info-circle',
      };
    }
    return {
      message: t('hint.withAmount', { amount: format(getAccountValue(account)) }),
      icon: 'info-circle',
    };
  }, [value, format, account, t]);

  return (
    <DInputCurrency
      label={t('transfer.total')}
      innerId="amountToTransfer"
      hint={hintCurrency.message}
      onEventChange={(newValue) => onChange(newValue)}
      value={value}
      placeholder="0,00"
    />
  );
}
