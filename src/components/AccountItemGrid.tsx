import {
  DBox,
  DIcon,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ACCOUNT_PATHS, SITE_URL } from '../config/widgetConfig';
import useAccountValue from '../hooks/useAccountValue';
import type { Account } from '../services/interface';

type Props = {
  account: Account;
};

export default function AccountItemGrid({ account }: Props) {
  const { t } = useTranslation();

  const accountPath = useMemo(
    () => `${SITE_URL}/${ACCOUNT_PATHS[account.type]}?product_id=${account.id}`,
    [account.id, account.type],
  );

  const { label, value } = useAccountValue(account);

  return (
    <DBox className="flex-grow-1 border shadow-none h-100 d-flex flex-column box-grid-item">
      <div className="mb-4 d-flex gap-4 align-items-start">
        <div className="d-block flex-grow-1">
          <p className="h5 mb-0">
            {account.name}
          </p>
          <p className="mb-0 text-muted">
            {account.accountNumber}
          </p>
        </div>
      </div>
      <div className="d-block mb-4 mt-auto">
        <p className="fw-bold h4 mb-0">
          {value}
        </p>
        <p className="mb-0">
          {label}
        </p>
      </div>
      <div>
        <a
          href={accountPath}
          className="d-flex gap-2 align-items-center link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          {t('actions.seeMore')}
          <DIcon
            icon="ArrowRight"
            size="1rem"
          />
        </a>
      </div>
    </DBox>
  );
}
