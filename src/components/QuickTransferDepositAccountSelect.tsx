import { DSelect } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import type { Account } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getDepositAccounts, getTransferFromAccount } from '../store/selectors';
import { setTransferFrom } from '../store/slice';

const formatAccountLabel = (option: Account, meta: { context: string }) => {
  if (meta.context === 'menu') {
    return (
      <div className="d-flex flex-column">
        <span className="fw-normal">{option.name}</span>
        <small
          className="text-muted"
        >
          {option.accountNumber}
        </small>
      </div>
    );
  }
  return `${option.name} ${option.accountNumber}`;
};

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
      getOptionLabel={({ name, accountNumber }: Account) => `${name} ${accountNumber}`}
      formatOptionLabel={formatAccountLabel}
      options={depositAccounts}
      value={transferFromAccount}
      onChange={(account) => dispatch(setTransferFrom(account as Account))}
      classNames={{ menu: () => 'mt-2' }}
    />
  );
}
