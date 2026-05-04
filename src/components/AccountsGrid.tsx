import { DIcon, DLayout } from '@dynamic-framework/ui-react';

import { AccountTypeConfig } from '../services/config';
import useAccountsEffect from '../services/hooks/useAccountsEffect';
import { useAppSelector } from '../store/hooks';
import { getAccountsByCategory } from '../store/selectors';

import AccountItemGrid from './AccountItemGrid';
import AccountsGridLoader from './loaders/AccountsGridLoader';

export default function AccountsGrid() {
  const { loading } = useAccountsEffect();
  const categories = useAppSelector(getAccountsByCategory);

  return (
    <div className="pt-6 pb-10 px-6 bg-white rounded accounts-grid">
      {!categories.length && !loading && <>No accounts</>}

      {loading && <AccountsGridLoader />}

      {!loading && categories.map((category) => (
        <div
          key={category.id}
          className="d-flex flex-column gap-2 mb-4"
        >
          <div className="d-flex gap-2 align-items-center mb-2 category-header">
            <DIcon
              hasCircle
              color="primary"
              icon={AccountTypeConfig[category.accounts[0].type].icon}
            />
            <div className="flex-fill text-truncate fw-normal fs-5">{category.name}</div>
          </div>
          <DLayout gap={2}>
            {category.accounts.map((account) => (
              <DLayout.Pane
                key={account.id}
                colsXs={12}
                colsLg={4}
                colsMd={6}
              >
                <AccountItemGrid account={account} />
              </DLayout.Pane>
            ))}
          </DLayout>
        </div>
      ))}
    </div>
  );
}
