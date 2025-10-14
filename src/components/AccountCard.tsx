import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import { Account } from '../services/interface';

type Props = {
  account?: Account;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: string;
};

export default function AccountCard(
  {
    account,
    size = 'md',
    type,
    className,
  }: Props,
) {
  const { t } = useTranslation();
  const typeCard = useMemo(() => type || API_ACCOUNT_LIST_FILTER, [type]);

  return (
    <div
      className={classNames(
        'account-card overflow-hidden text-white',
        'position-relative rounded-3 flex-column',
        'd-none d-lg-flex',
        size === 'sm' ? 'p-2 card-sm' : 'p-8',
        typeCard,
        className,
      )}
    >
      <div className="account-card-icons justify-content-between">
        <img
          src="https://modyo.modyo.me:3000/uploads/ded84d0e-4895-4465-9dcb-06d8b50fdaa9/original/Visa_Logo.png"
          alt="Chip"
          className="logo-visa"
          width={100}
          style={{
            width: '25%',
          }}
        />
        <div className="chip p-2 rounded-2">
          <img
            src="https://modyo.modyo.me:3000/uploads/f72098b8-750e-46e3-bce5-96464483e74e/original/chip-debit-svgrepo-com.png"
            alt="chip"
            width={30}
          />
        </div>
      </div>

      <div className="account-card-details mt-auto d-none d-sm-block">
        <div className="account-card-number font-monospace d-none d-sm-block mb-4">
          {account?.accountNumber}
        </div>
        <small className="d-block opacity-50">{t('cardHolder')}</small>
        <span className="name">{account?.name}</span>
      </div>
    </div>
  );
}
