import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ACCOUNT_PATHS, SITE_URL } from '../config/widgetConfig';
import useAccountValue from '../hooks/useAccountValue';
import { AccountTypeConfig } from '../services/config';
import type { Account } from '../services/interface';

import CardAccount from './CardAccount';

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
    <CardAccount
      className="flex-grow-1"
      icon={AccountTypeConfig[account.type].icon}
      theme={AccountTypeConfig[account.type].theme}
      name={account.alias || account.name}
      number={account.accountNumber}
      balance={value}
      balanceText={label}
      actionText={t('details')}
      onClick={accountPath}
    />
  );
}
