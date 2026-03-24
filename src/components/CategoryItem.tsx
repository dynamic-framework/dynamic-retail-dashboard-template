import { DIcon } from '@dynamic-framework/ui-react';
import classnames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SITE_URL, ACCOUNT_PATHS } from '../config/widgetConfig';
import useAccountValue from '../hooks/useAccountValue';
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
  const { value } = useAccountValue(account);

  const accountPath = useMemo(() => (
    `${SITE_URL}/${ACCOUNT_PATHS[account.type]}?account_id=${account.id}`
  ), [account.id, account.type]);

  return (
    <div className="py-1 category-item-container">
      <a
        href={accountPath}
        className={classnames(
          'cursor-pointer text-decoration-none text-body',
          'py-2 px-4 rounded-2',
          'd-flex flex-column flex-lg-row gap-2 gap-lg-4 justify-content-between',
          'hover:bg-primary-25 transition-all category-item',
          account.type,
        )}
      >
        <div className="d-flex gap-4 align-items-center">
          <div className="flex-grow-1">
            <p className="fs-body fs-lg-5 fw-semibold m-0 account-name">{account.name}</p>
            <p className="mb-0 text-muted account-number">{account.accountNumber}</p>
          </div>
        </div>
        <div className="d-flex gap-4 align-items-center justify-content-between ms-lg-auto">
          <div className="d-flex flex-column text-start w-100">
            <div className="d-flex gap-2">
              <p className="fw-semibold fs-body fs-lg-5 m-0 flex-1">{value}</p>
              <span className="d-inline-flex d-lg-none link-primary align-items-center gap-1 ms-auto">
                <span className="text-see-more small">{t('actions.seeMore')}</span>
                <DIcon
                  icon="ArrowRight"
                  color="primary"
                />
              </span>
            </div>
          </div>
        </div>
        <DIcon
          icon="ChevronRight"
          className="d-none d-lg-inline-flex"
          color="primary"
        />
      </a>
    </div>
  );
}
