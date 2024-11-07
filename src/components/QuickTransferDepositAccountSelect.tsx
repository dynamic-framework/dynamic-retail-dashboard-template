import { DSelect } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import type { Account } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getTransferFromAccount } from '../store/selectors';
import { setTransferFrom } from '../store/slice';

export default function QuickTransferDepositAccountSelect() {
  const { t } = useTranslation();
  const depositAccounts = useAppSelector(getDepositAccounts);
  const transferFromAccount = useAppSelector(getTransferFromAccount);
  const dispatch = useAppDispatch();

  return (
    <DSelect
      id="selectAccountFrom"
      label={t('transfer.from')}
      getOptionValue={({ accountNumber }: Account) => accountNumber}
      getOptionLabel={({ name, accountNumber }: Account) => `${name} *** ${accountNumber}`}
      options={depositAccounts}
      value={transferFromAccount}
      onChange={(account) => dispatch(setTransferFrom(account as Account))}
      classNames={{ menu: () => 'mt-2' }}
    />
  );
}
