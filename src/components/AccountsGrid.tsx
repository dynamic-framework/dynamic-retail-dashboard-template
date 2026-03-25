import { DLayout } from '@dynamic-framework/ui-react';

import useAccountsEffect from '../services/hooks/useAccountsEffect';
import { useAppSelector } from '../store/hooks';
import { getAccounts } from '../store/selectors';

import AccountItemGrid from './AccountItemGrid';
import AccountsGridLoader from './loaders/AccountsGridLoader';

export default function AccountsGrid() {
  const { loading } = useAccountsEffect();
  const accounts = useAppSelector(getAccounts);

  return (
    <div className="pt-6 pb-10 px-6 bg-white rounded accounts-grid">
      {!accounts.length && !loading && <>No accounts</>}

      {loading && <AccountsGridLoader />}

      {!loading && (
        <DLayout gap={2}>
          {accounts.map((account) => (
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
      )}
    </div>
  );
}
