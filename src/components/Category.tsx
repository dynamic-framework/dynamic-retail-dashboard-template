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
      defaultCollapsed
      className="rounded-1 shadow-none"
      Component={(
        <h5 className="flex-fill text-truncate">{name}</h5>
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
