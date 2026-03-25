import { useDContext, DLayout } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';

import AccountsGrid from './components/AccountsGrid';
import CardActivateStatus from './components/CardActivateStatus';
import CategoryList from './components/CategoryList';
import Greeting from './components/Greeting';
import HideAndNavs from './components/HideAndNavs';
import QuickActions from './components/QuickActions';
import QuickTransfer from './components/QuickTransfer';
import { CONTEXT_CONFIG } from './config/widgetConfig';
import { useAppSelector } from './store/hooks';
import { getCurrentView } from './store/selectors';

const VIEWS = {
  list: CategoryList,
  grid: AccountsGrid,
};

export default function App() {
  const { setContext } = useDContext();
  const currentView = useAppSelector(getCurrentView);

  const CurrentViewCmp = useMemo(
    () => VIEWS[currentView],
    [currentView],
  );

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  return (
    <div className="container">
      <DLayout>
        <DLayout.Pane cols={12}>
          <CardActivateStatus />
          <Greeting />
        </DLayout.Pane>
        <DLayout.Pane
          colsXs={12}
          colsMd={8}
        >
          <div className="d-flex flex-column gap-6 container-main">
            <QuickActions />
            <HideAndNavs />
            <CurrentViewCmp />
          </div>
        </DLayout.Pane>
        <DLayout.Pane
          colsXs={12}
          colsMd={4}
        >
          <QuickTransfer />
        </DLayout.Pane>
      </DLayout>
    </div>
  );
}
