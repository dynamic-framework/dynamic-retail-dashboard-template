import { DIcon } from '@dynamic-framework/ui-react';
import classnames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SITE_URL, ACCOUNT_PATHS } from '../config/widgetConfig';
import useAccountValue from '../hooks/useAccountValue';
import { AccountTypeConfig } from '../services/config';
import type { Account } from '../services/interface';

type Props = {
  account: Account;
};

export default function CategoryItem(
  {
    account,
  }: Props,
) {
  const { t } = useTranslation();
  const { value, label } = useAccountValue(account);

  const accountPath = useMemo(() => (
    `${SITE_URL}/${ACCOUNT_PATHS[account.type]}?account_id=${account.id}`
  ), [account.id, account.type]);

  return (
    <a
      href={accountPath}
      className={classnames(
        'cursor-pointer text-decoration-none text-body',
        'py-6 px-8 border rounded-1',
        'd-flex flex-column flex-lg-row gap-4 justify-content-between',
        'category-item',
      )}
    >
      <div className="d-flex gap-4 align-items-center">
        <DIcon
          icon={AccountTypeConfig[account.type].icon}
          theme={AccountTypeConfig[account.type].theme}
          hasCircle
        />
        <div className="flex-grow-1">
          <p className="h5 fw-bold m-0">{account.name}</p>
          <p className="mb-0">{account.accountNumber}</p>
        </div>
      </div>
      <div className="d-flex gap-4 align-items-center justify-content-between">
        <div className="d-flex flex-column text-start">
          <p className="fw-bold h3 m-0">{value}</p>
          <p className="m-0 text-lg-end">{label}</p>
        </div>
      </div>
      <span className="d-inline-flex d-lg-none link-primary  align-items-center gap-1">
        {t('actions.knowMore')}
        <DIcon
          icon="arrow-right"
          size="var(--bs-fs-body-small)"
        />
      </span>
    </a>
  );
}
