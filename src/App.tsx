import { useTranslation } from 'react-i18next';
import { MButton } from '@modyo-dynamic/modyo-design-system-react';

import CategoryList from './components/CategoryList';
import QuickTransfer from './components/QuickTransfer';
import { useAppSelector } from './store/hooks';
import { getAccounts } from './store/selectors';
import useToggleBalances from './hooks/useToggleBalances';

export default function App() {
  const { t } = useTranslation();
  const products = useAppSelector(getAccounts);
  const { data, callback } = useToggleBalances();

  return (
    <div className="container justify-content-center py-3">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="fs-4 fw-bold">{t('my-products')}</h1>
            {products.length > 0 && (
              <MButton
                iconStart={data.icon}
                text={data.label}
                variant="link"
                theme="secondary"
                onMClick={callback}
              />
            )}
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <CategoryList />
        </div>
        <div className="d-none d-lg-block col-lg-4">
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
}
