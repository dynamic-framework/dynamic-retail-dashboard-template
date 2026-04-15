import { DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import {
  INVESTMENT_URL,
  PAYMENTS_URL,
  TRANSFER_URL,
} from '../config/widgetConfig';

const ACTIONS = [
  {
    text: 'transfer',
    path: TRANSFER_URL,
    icon: 'MoveHorizontal',
  },
  {
    text: 'payService',
    path: PAYMENTS_URL,
    icon: 'CircleDollarSign',
  },
  {
    text: 'invest',
    path: INVESTMENT_URL,
    icon: 'Landmark',
  },
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="quick-actions">
      {/* <p className="fs-5 my-4">{t('quickActions.title')}</p> */}
      <div className="d-flex gap-4 quick-actions-container small fs-md-body">
        {ACTIONS.map(({ path, text, icon }) => (
          <a
            key={text}
            href={path}
            className={classNames(
              'd-inline-flex align-items-center flex-column flex-md-row',
              'border border-white',
              'hover:border-primary',
              'text-decoration-none text-dark',
              'shadow-lg rounded-2 p-2 p-md-4 gap-2 col',
              'bg-white transition-all quick-action-item',
            )}
          >
            <DIcon
              color="primary"
              icon={icon}
              size="1.5rem"
              hasCircle
            />
            <p className="m-0 text-primary">{t(`quickActions.${text}`)}</p>
            <DIcon
              className="ms-auto d-none d-md-block"
              icon="ChevronRight"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
