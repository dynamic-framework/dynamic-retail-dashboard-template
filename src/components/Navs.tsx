import { DButton, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { View } from '../config/widgetConfig';
import useToggleBalances from '../hooks/useToggleBalances';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAccounts, getCurrentView } from '../store/selectors';
import { setCurrentView } from '../store/slice';

const OPTIONS: Array<{ icon: string, view: View }> = [
  {
    icon: 'list-check',
    view: 'list',
  },
  {
    icon: 'layout-three-columns',
    view: 'slides',
  },
];

export default function Navs() {
  const accounts = useAppSelector(getAccounts);
  const { data, callback } = useToggleBalances();
  const currentView = useAppSelector(getCurrentView);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (accounts.length < 1) {
    return null;
  }

  return (
    <ul className="nav nav-pills gap-1 p-0 justify-content-end">
      <DButton
        iconStart={data.icon}
        text={data.label}
        variant="link"
        className="px-4 py-2"
        onClick={callback}
      />
      {OPTIONS.map(({ icon, view }) => (
        <li
          className="nav-item"
          key={view}
        >
          <button
            className={classNames(
              'nav-link nav-link-custom d-inline-flex align-items-center gap-1',
              { active: view === currentView },
            )}
            type="button"
            onClick={() => dispatch(setCurrentView(view))}
          >
            <DIcon
              icon={icon}
              size="var(--bs-ref-spacer-4)"
            />
            {t(view)}
          </button>
        </li>
      ))}
    </ul>
  );
}
