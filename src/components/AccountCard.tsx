import classNames from 'classnames';
import { useMemo } from 'react';

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
  const typeCard = useMemo(() => type || API_ACCOUNT_LIST_FILTER, [type]);

  return (
    <div
      className={classNames(
        'account-card overflow-hidden bg-gray text-white',
        'position-relative rounded-1 d-flex flex-column',
        size === 'sm' ? 'p-2 card-sm' : 'p-8',
        typeCard,
        className,
      )}
    >
      <div className="d-flex justify-content-between align-items-start">
        <img
          src="https://cdn.modyo.cloud/uploads/f92a0da8-c987-4033-8faa-ab84db5f6214/original/Logotype_Dynamic.png"
          alt="Dynamic Bank"
          width={size === 'sm' ? 20 : 80}
        />
        <img
          src="https://cdn.modyo.cloud/uploads/2c76d77c-824c-470e-b03a-c7067febbe57/original/Chip.png"
          alt="Chip"
          width={size === 'sm' ? 10 : 38}
        />
      </div>

      <div className="account-card-details mt-auto d-none d-sm-flex">
        <div className="flex-1">
          <span className="name">{account?.alias}</span>
          <div className="account-card-number font-monospace d-none d-sm-block">
            <small>{account?.accountNumber}</small>
          </div>
        </div>

        <img
          src="https://cloud.modyocdn.com/uploads/b3f99e99-8322-4f1f-aefc-c6c5de86b764/original/Mastercard.png"
          alt="Mastercard"
          className="master-card"
          width={40}
        />
      </div>
    </div>
  );
}
