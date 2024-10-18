import { DCollapse } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';

import type { Account } from '../services/interface';
import getAccountValue from '../services/utils/getAccountValue';

import CategoryItem from './CategoryItem';

type Props = {
  name: string;
  accounts: Array<Account>;
};

export default function Category(
  {
    name,
    accounts,
  }: Props,
) {
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
      className="rounded-1"
      Component={(
        <div className="d-flex align-items-center gap-4">
          <h5 className="flex-fill text-truncate">{name}</h5>
          {/* TODO: remove? <small className="text-gray-500 d-none d-md-block">{t('total')}</small>
        <p className="fs-6 fw-bold text-dark mb-0">{showBalances ? format(total) : '$ ***'}</p> */}
        </div>
      )}
    >
      <div className="d-flex flex-column gap-4">
        {accounts.map((account) => (
          <CategoryItem key={account.id} account={account} />
        ))}
      </div>
    </DCollapse>
  );
}
