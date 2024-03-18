import { useTranslation } from 'react-i18next';
import { DButton, useDContext } from '@dynamic-framework/ui-react';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAccounts, getCurrentView } from './store/selectors';

import CategoryList from './components/CategoryList';
import QuickTransfer from './components/QuickTransfer';
import useToggleBalances from './hooks/useToggleBalances';
import AccountSlides from './components/AccountSlides';
import LatestActivitiesList from './components/LatestActivitiesList';

import { setCurrentView } from './store/slice';
import { CONTEXT_CONFIG, View } from './config/widgetConfig';

const VIEWS = {
  list: CategoryList,
  slides: AccountSlides,
};

export default function App() {
  const { setContext } = useDContext();

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

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
    <div className="row">
      <div className="col-12 col-lg-8">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-4">
          {/* <h1 className="fs-4 fw-bold w-100">{t('my-accounts')}</h1> */}
          {accounts.length > 0 && (
            <div className="d-flex flex-grow-1 w-100 justify-content-end">
              <DButton
                iconStart={data.icon}
                text={data.label}
                variant="link"
                theme="secondary"
                onClick={callback}
              />
              {/* For Mobile */}
              <DButton
                iconStart="view-list"
                variant="link"
                theme="secondary"
                onClick={() => handlerView('list')}
                className="d-flex d-lg-none"
              />
              <DButton
                iconStart="grid"
                variant="link"
                theme="secondary"
                onClick={() => handlerView('slides')}
                className="d-flex d-lg-none"
              />
              {/* For Desktop */}
              <DButton
                iconStart="view-list"
                text={t('list')}
                variant="link"
                theme="secondary"
                onClick={() => handlerView('list')}
                className="d-none d-lg-flex"
              />
              <DButton
                iconStart="grid"
                text={t('slides')}
                variant="link"
                theme="secondary"
                onClick={() => handlerView('slides')}
                className="d-none d-lg-flex"
              />
            </div>
          )}
        </div>
      </div>
      <div className="col-12 col-lg-8">
        <CurrentView />
        <div className="row">
          <h5 className="fw-bold py-4">
            {t('transactions')}
          </h5>
          <div className="d-block col">
            <LatestActivitiesList />
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block col-lg-4">
        <QuickTransfer />
      </div>
    </div>
  );
}
