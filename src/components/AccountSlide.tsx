import { DCard, DIcon } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ACCOUNT_PATHS, SITE_URL } from '../config/widgetConfig';
import useAccountValue from '../hooks/useAccountValue';
import { AccountTypeConfig } from '../services/config';
import type { Account } from '../services/interface';

type Props = {
  account: Account;
};

export default function AccountSlide({ account }: Props) {
  const { t } = useTranslation();

  const accountPath = useMemo(
    () => `${SITE_URL}/${ACCOUNT_PATHS[account.type]}?product_id=${account.id}`,
    [account.id, account.type],
  );

  const { label, value } = useAccountValue(account);

  return (
    <DCard className="d-card-account flex-grow-1 border shadow-none">
      <DCard.Body>
        <div className="d-flex gap-4 align-items-start">
          <DIcon
            icon={AccountTypeConfig[account.type].icon}
            theme={AccountTypeConfig[account.type].theme}
            hasCircle
            size="var(--bs-ref-spacer-6)"
          />
          <div className="d-block flex-grow-1">
            <p className="h5 mb-0">
              {account.alias || account.name}
            </p>
            <p className="mb-0">
              {account.accountNumber}
            </p>
          </div>
        </div>
        <div className="d-block">
          <p className="fw-bold h3 mb-0">
            {value}
          </p>
          <p className="mb-0">
            {label}
          </p>
        </div>
        <div>
          <a
            className="d-inline-flex align-items-center gap-1 text-nowrap"
            href={accountPath}
          >
            {/* TODO: Know more */}
            {t('Know more')}
            <DIcon
              icon="arrow-right"
              size="var(--bs-fs-body-small)"
            />
          </a>
        </div>
      </DCard.Body>
    </DCard>
  );
}
