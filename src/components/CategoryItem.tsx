import { DCollapse, DIcon, useFormatCurrency } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountType, AccountTypeConfig } from '../services/config';
import type { Account } from '../services/interface';
import getAccountValue from '../services/utils/getAccountValue';
import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';

import AccountItem from './AccountItem';

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
        <div className="d-flex align-items-center gap-4">
          <DIcon
            icon={AccountTypeConfig[type].icon}
            theme={AccountTypeConfig[type].theme}
            hasCircle
          />
          <h2 className="fs-6 flex-fill text-truncate">{name}</h2>
          <small className="text-gray-500 d-none d-md-block">{t('total')}</small>
          <p className="fs-6 fw-bold text-dark mb-0">{showBalances ? format(total) : '$ ***'}</p>
        </div>
      )}
    >
      <div className="d-flex flex-column gap-4">
        {accounts.map((account) => (
          <AccountItem key={account.id} account={account} />
        ))}
      </div>
    </DCollapse>
  );
}
