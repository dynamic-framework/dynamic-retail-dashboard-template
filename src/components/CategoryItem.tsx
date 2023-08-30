import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DCollapse, DIcon, useFormatCurrency } from '@dynamic-framework/ui-react';

import AccountItem from './AccountItem';
import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';
import { AccountType, AccountTypeConfig } from '../services/config';
import getAccountValue from '../services/utils/getAccountValue';

import type { Account } from '../services/interface';

type Props = {
  name: string;
  type: AccountType;
  accounts: Array<Account>;
};

export default function CategoryItem(
  {
    name,
    type,
    accounts,
  }: Props,
) {
  const { format } = useFormatCurrency();
  const { t } = useTranslation();
  const showBalances = useAppSelector(getShowBalances);

  const total = useMemo(() => accounts.reduce<number>(
    (sum, account: Account) => (sum + getAccountValue(account)),
    0,
  ), [accounts]);

  if (!total) {
    return null;
  }

  return (
    <DCollapse
      defaultCollapsed={accounts.length > 0}
      className="rounded shadow-sm"
      Component={(
        <div className="d-flex align-items-center gap-3">
          <DIcon
            icon={AccountTypeConfig[type].icon}
            theme={AccountTypeConfig[type].theme}
            hasCircle
          />
          <h2 className="fs-6 flex-fill text-light-emphasis fw-bold text-truncate">{name}</h2>
          <small className="text-light-emphasis">{t('total')}</small>
          <p className="fw-bold text-dark">{showBalances ? format(total) : '$ ***'}</p>
        </div>
      )}
    >
      <div className="d-flex flex-column gap-3">
        {accounts.map((account) => (
          <AccountItem key={account.id} account={account} />
        ))}
      </div>
    </DCollapse>
  );
}
