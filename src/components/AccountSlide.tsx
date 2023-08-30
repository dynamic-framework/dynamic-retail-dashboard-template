/* eslint-disable react/destructuring-assignment */
import {
  DCardAccount,
} from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ACCOUNT_PATHS, SITE_URL } from '../config/widgetConfig';
import type { Account } from '../services/interface';
import { AccountTypeConfig } from '../services/config';
import useAccountValue from '../hooks/useAccountValue';

type Props = {
  account: Account;
};

export default function AccountSlide({ account }: Props) {
  const { t } = useTranslation();

  const accountPath = useCallback(() => {
    window.location.href = `${SITE_URL}/${ACCOUNT_PATHS[account.type]}?product_id=${account.id}`;
  }, [account.id, account.type]);

  const { label, value } = useAccountValue(account);

  return (
    <DCardAccount
      className="flex-grow-1"
      icon={AccountTypeConfig[account.type].icon}
      theme={AccountTypeConfig[account.type].theme}
      name={account.alias || account.name}
      number={account.accountNumber}
      balance={value}
      balanceText={label}
      actionText={t('details')}
      onEventClick={accountPath}
    />
  );
}
