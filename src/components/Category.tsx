import { DCollapse, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useMemo, useState } from 'react';

import { AccountTypeConfig } from '../services/config';
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
  const [collapsed, setCollapsed] = useState(false);
  const total = useMemo(() => accounts.reduce<number>(
    (sum, account: Account) => (sum + getAccountValue(account)),
    0,
  ), [accounts]);

  if (!total) {
    return null;
  }

  return (
    <DCollapse
      defaultCollapsed={collapsed}
      className={classNames(
        'rounded-2 category-collapse',
        collapsed ? 'collapsed' : 'expanded',
      )}
      iconOpen="Plus"
      iconClose="Minus"
      onChange={setCollapsed}
      Component={(
        <div className="d-flex gap-2 align-items-center category-header">
          <DIcon
            hasCircle
            color="primary"
            icon={AccountTypeConfig[accounts[0].type].icon}
          />
          <div className="flex-fill text-truncate fw-normal fs-5">{name}</div>
        </div>
      )}
    >
      <div className="d-flex flex-column category-accounts">
        {accounts.map((account) => (
          <CategoryItem
            key={account.id}
            account={account}
          />
        ))}
      </div>
    </DCollapse>
  );
}
