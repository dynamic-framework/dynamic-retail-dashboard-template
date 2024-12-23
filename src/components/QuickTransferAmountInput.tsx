import { DInputCurrency, useFormatCurrency } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import getAccountValue from '../services/utils/getAccountValue';
import { useAppSelector } from '../store/hooks';
import { getTransferFromAccount } from '../store/selectors';

type Props = {
  value?: number;
  onChange: Dispatch<SetStateAction<number | undefined>>;
  invalid: boolean;
};

export default function QuickTransferAmountInput({ value, onChange, invalid }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();
  const transferFromAccount = useAppSelector(getTransferFromAccount);

  const hintCurrency = useMemo(() => {
    if (value === 0 || !transferFromAccount) {
      return {
        message: t('hint.noAmount'),
        icon: 'info-circle',
      };
    }
    return {
      message: t('hint.withAmount', { amount: format(getAccountValue(transferFromAccount)) }),
      icon: 'info-circle',
    };
  }, [value, format, transferFromAccount, t]);

  return (
    <DInputCurrency
      label={t('transfer.total')}
      id="amountToTransfer"
      hint={hintCurrency.message}
      onChange={(newValue) => onChange(newValue)}
      value={value}
      placeholder="0.00"
      invalid={invalid && (value === undefined || value < 1)}
    />
  );
}
