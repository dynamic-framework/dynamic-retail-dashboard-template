import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MButton } from '@modyo-dynamic/modyo-design-system-react';

import CategoryList from './components/CategoryList';
import QuickTransfer from './components/QuickTransfer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getProducts, getShowBalances } from './store/selectors';
import { setShowBalances } from './store/slice';

export default function App() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const products = useAppSelector(getProducts);

  const showBalances = useAppSelector(getShowBalances);
  const handleShowBalances = () => {
    dispatch(setShowBalances(!showBalances));
  };

  const toggleBalance = useMemo(() => {
    if (showBalances) {
      return {
        label: t('balance.hide'),
        icon: 'eye-slash',
      };
    }
    return {
      label: t('balance.show'),
      icon: 'eye',
    };
  }, [showBalances, t]);

  return (
    <div className="container justify-content-center py-3">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="fs-4 fw-bold">{t('my-products')}</h1>
            {!!products.length && (
              <MButton
                iconStart={toggleBalance.icon}
                text={toggleBalance.label}
                variant="link"
                theme="secondary"
                onMClick={handleShowBalances}
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
