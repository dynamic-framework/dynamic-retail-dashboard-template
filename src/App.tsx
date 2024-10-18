import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';

import AccountSlides from './components/AccountSlides';
import CardActivateStatus from './components/CardActivateStatus';
import CategoryList from './components/CategoryList';
import Greeting from './components/Greeting';
import Navs from './components/Navs';
import QuickActions from './components/QuickActions';
import QuickTransfer from './components/QuickTransfer';
import { CONTEXT_CONFIG } from './config/widgetConfig';
import { useAppSelector } from './store/hooks';
import { getCurrentView } from './store/selectors';

const VIEWS = {
  list: CategoryList,
  slides: AccountSlides,
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
    <div className="container py-6">
      <div className="row row-gap-6">
        <div className="col-12">
          <CardActivateStatus />
          <Greeting />
        </div>
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-6">
            <QuickActions />
            <Navs />
            <CurrentViewCmp />
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
}
