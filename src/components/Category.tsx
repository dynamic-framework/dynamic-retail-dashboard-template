import {
  DCollapse,
  DIcon,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';

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
  const { format } = useFormatCurrency();
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
      className="rounded-1 card-hover"
      Component={(
        <div className="d-flex align-items-center gap-2">
          <DIcon
            icon="piggy-bank"
            theme={AccountTypeConfig[accounts[0].type].theme}
            hasCircle
          />
          <div>
            <h5 className="flex-fill text-truncate fs-5">{name}</h5>
            <span className="flex-shrink-0 text-muted">
              {`Total: ${format(total)}`}
            </span>
          </div>
        </div>
      )}
    >
      <div className="d-flex flex-column gap-4">
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
