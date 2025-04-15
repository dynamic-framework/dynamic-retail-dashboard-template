import {
  DButton,
  DIcon,
  useMediaBreakpointUpSm,
} from '@dynamic-framework/ui-react';
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

export default function HideAndNavs() {
  const accounts = useAppSelector(getAccounts);
  const { data, callback } = useToggleBalances();
  const currentView = useAppSelector(getCurrentView);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const sm = useMediaBreakpointUpSm(true);

  if (accounts.length < 1) {
    return null;
  }

  return (
    <div className="d-flex justify-content-end gap-1">
      <DButton
        iconStart={data.icon}
        text={data.label}
        variant="link"
        onClick={callback}
      />
      <ul className="nav nav-pills gap-1 p-0">
        {OPTIONS.map(({ icon, view }) => (
          <li
            className="nav-item"
            key={view}
          >
            <button
              className={classNames(
                'nav-link nav-link-custom',
                'd-inline-flex align-items-center gap-1 h-100',
                { active: view === currentView },
              )}
              type="button"
              onClick={() => dispatch(setCurrentView(view))}
              aria-label={t(view)}
            >
              <DIcon
                icon={icon}
                size="var(--bs-ref-spacer-4)"
              />
              {sm ? t(view) : undefined}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
