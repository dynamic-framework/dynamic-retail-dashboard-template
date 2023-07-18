import { useMemo } from 'react';
import classnames from 'classnames';

import useAccountValue from '../hooks/useAccountValue';
import { SITE_URL, ACCOUNT_PATHS } from '../config/widgetConfig';

import type { Account } from '../services/interface';

type Props = {
  account: Account;
};

export default function AccountItem(
  {
    account,
  }: Props,
) {
  const { value, label } = useAccountValue(account);

  const accountPath = useMemo(() => (
    `${SITE_URL}/${ACCOUNT_PATHS[account.type]}?account_id=${account.id}`
  ), [account.id, account.type]);

  return (
    <a
      href={accountPath}
      className={classnames(
        'cursor-pointer text-decoration-none text-body',
        'border-top',
        'pt-3',
        'd-flex flex-column flex-lg-row gap-3 justify-content-between',
      )}
    >
      <div className="d-flex gap-3 align-items-center">
        <div className="d-flex flex-column flex-grow-1">
          <p>{account.alias}</p>
          <small className="text-light-emphasis">{account.accountNumber}</small>
        </div>
      </div>
      <div className="d-flex gap-3 align-items-center justify-content-between">
        <div className="text-start text-lg-end">
          <div className="sp text-light-emphasis">{label}</div>
        </div>
        <div className="d-flex flex-column text-end">
          <div className="sp">{value}</div>
        </div>
      </div>
    </a>
  );
}
