import { useTranslation } from 'react-i18next';
import { DInputSelect } from '@dynamic-framework/ui-react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getTransferFromAccount } from '../store/selectors';

import type { Account } from '../services/interface';
import { setTransferFrom } from '../store/slice';

export default function QuickTransferDepositAccountSelect() {
  const { t } = useTranslation();
  const depositAccounts = useAppSelector(getDepositAccounts);
  const transferFromAccount = useAppSelector(getTransferFromAccount);
  const dispatch = useAppDispatch();

  return (
    <DInputSelect<Account>
      id="selectAccountFrom"
      label={t('transfer.from')}
      valueExtractor={({ accountNumber }: Account) => accountNumber}
      labelExtractor={({ name, accountNumber }: Account) => `${name} ••• ${accountNumber}`}
      options={depositAccounts}
      selectedOption={transferFromAccount}
      onChange={(account) => dispatch(setTransferFrom(account as Account))}
    />
  );
}
