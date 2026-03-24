import {
  DBox, DButton, DIcon,
} from '@dynamic-framework/ui-react';
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
    <DBox className="flex-grow-1 border shadow-none">
      <div className="mb-4 d-flex gap-4 align-items-start">
        <DIcon
          icon={AccountTypeConfig[account.type].icon}
          color="primary"
          hasCircle
        />
        <div className="d-block flex-grow-1">
          <p className="h5 mb-0">
            {account.name}
          </p>
          <p className="mb-0 text-muted">
            {account.accountNumber}
          </p>
        </div>
      </div>
      <div className="d-block mb-4">
        <p className="fw-bold h3 mb-0">
          {value}
        </p>
        <p className="mb-0">
          {label}
        </p>
      </div>
      <div>
        <DButton
          iconEnd="ArrowRight"
          href={accountPath}
          variant="link"
          text={t('actions.seeMore')}
        />
      </div>
    </DBox>
  );
}
