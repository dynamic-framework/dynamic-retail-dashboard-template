/* eslint-disable react/jsx-props-no-spreading */
import { DButton, useDContext } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AccountSlides from './components/AccountSlides';
import CardActivateStatus from './components/CardActivateStatus';
import CategoryList from './components/CategoryList';
import QuickTransfer from './components/QuickTransfer';
import { CONTEXT_CONFIG, View } from './config/widgetConfig';
import useToggleBalances from './hooks/useToggleBalances';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAccounts, getCurrentView } from './store/selectors';
import { setCurrentView } from './store/slice';

const VIEWS = {
  list: CategoryList,
  slides: AccountSlides,
};

const VIEW_OPTIONS = [
  {
    icon: 'view-list',
    view: 'list',
  },
  {
    icon: 'grid',
    view: 'slides',
  },
];

export default function App() {
  const { data, callback } = useToggleBalances();
  const { setContext } = useDContext();
  const { t } = useTranslation();
  const accounts = useAppSelector(getAccounts);
  const currentView = useAppSelector(getCurrentView) as View;
  const dispatch = useAppDispatch();

  const handlerView = (view: View) => {
    dispatch(setCurrentView(view));
  };

  const CurrentViewCmp = useMemo(
    () => VIEWS[currentView],
    [currentView],
  );

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-4">
            {accounts.length > 0 && (
            <div className="d-flex flex-grow-1 gap-1 w-100 justify-content-end views-btn">
              <DButton
                iconStart={data.icon}
                text={data.label}
                variant="link"
                theme="secondary"
                onClick={callback}
              />
              {/* For Mobile */}
              {VIEW_OPTIONS.map(({ icon, view }) => (
                <DButton
                  key={`${view}-mobile`}
                  iconStart={icon}
                  variant="outline"
                  theme="secondary"
                  onClick={() => handlerView(view as View)}
                  className="d-flex d-lg-none"
                  {...currentView === view && { state: 'active' }}
                />
              ))}
              {/* For Desktop */}
              {VIEW_OPTIONS.map(({ icon, view }) => (
                <DButton
                  key={`${view}-desktop`}
                  iconStart={icon}
                  text={t(view)}
                  variant="outline"
                  theme="secondary"
                  onClick={() => handlerView(view as View)}
                  className="d-none d-lg-flex px-4"
                  {...currentView === view && { state: 'active' }}
                />
              ))}
            </div>
            )}
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <CardActivateStatus account={accounts[0]} />
          <CurrentViewCmp />
        </div>
        <div className="d-none d-lg-block col-lg-4">
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
}
