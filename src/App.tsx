import { useTranslation } from 'react-i18next';
import { DButton } from '@dynamic-framework/ui-react';

import { useMemo } from 'react';
import CategoryList from './components/CategoryList';
import QuickTransfer from './components/QuickTransfer';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAccounts, getCurrentView } from './store/selectors';
import useToggleBalances from './hooks/useToggleBalances';
import AccountSlides from './components/AccountSlides';
import { setCurrentView } from './store/slice';
import TableActivity from './components/TableActivity';
import CollapseActivity from './components/CollapseActivity';
import { View } from './config/widgetConfig';

const VIEWS = {
  list: CategoryList,
  slides: AccountSlides,
};

export default function App() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(getAccounts);
  const currentStep = useAppSelector(getCurrentView) as keyof typeof VIEWS;

  const { data, callback } = useToggleBalances();

  const handlerView = (view: View) => {
    dispatch(setCurrentView(view));
  };

  const CurrentView = useMemo(
    () => VIEWS[currentStep],
    [currentStep],
  );

  return (
    <div className="container justify-content-center py-3">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-3">
            <h1 className="fs-4 fw-bold w-100">{t('my-accounts')}</h1>
            {accounts.length > 0 && (
              <div className="d-flex flex-grow-1 w-100 justify-content-end">
                <DButton
                  iconStart={data.icon}
                  text={data.label}
                  variant="link"
                  theme="secondary"
                  onEventClick={callback}
                />
                {/* For Mobile */}
                <DButton
                  iconStart="view-list"
                  variant="link"
                  theme="secondary"
                  onEventClick={() => handlerView('list')}
                  className="d-block d-lg-none"
                />
                <DButton
                  iconStart="grid"
                  variant="link"
                  theme="secondary"
                  onEventClick={() => handlerView('slides')}
                  className="d-block d-lg-none"
                />
                {/* For Desktop */}
                <DButton
                  iconStart="view-list"
                  text={t('list')}
                  variant="link"
                  theme="secondary"
                  onEventClick={() => handlerView('list')}
                  className="d-none d-lg-block"
                />
                <DButton
                  iconStart="grid"
                  text={t('slides')}
                  variant="link"
                  theme="secondary"
                  onEventClick={() => handlerView('slides')}
                  className="d-none d-lg-block"
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <CurrentView />
          <div className="row">
            <h5 className="fw-bold py-3">
              {t('frequent-transactions')}
            </h5>
            <div className="d-none d-md-block col">
              <TableActivity />
            </div>
            <div className="d-block d-md-none col">
              <CollapseActivity />
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block col-lg-4">
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
}
