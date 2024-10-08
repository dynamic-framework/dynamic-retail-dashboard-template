import classnames from 'classnames';
import { useMemo } from 'react';

import { SITE_URL, ACCOUNT_PATHS } from '../config/widgetConfig';
import useAccountValue from '../hooks/useAccountValue';
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
        'border-top border-gray-100',
        'pt-4',
        'd-flex flex-column flex-lg-row gap-4 justify-content-between',
      )}
    >
      <div className="d-flex gap-4 align-items-center">
        <div className="d-flex flex-column flex-grow-1">
          <small>{account.alias}</small>
          <p className="text-gray-500 mb-0">{account.accountNumber}</p>
        </div>
      </div>
      <div className="d-flex gap-4 align-items-center justify-content-between">
        <div className="text-start text-lg-end">
          <div className="small text-gray-500">{label}</div>
        </div>
        <div className="d-flex flex-column text-end">
          <div className="fw-bold">{value}</div>
        </div>
      </div>
    </a>
  );
}
