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
      <p className="fs-5 my-4">{t('quickActions.title')}</p>
      <div className="d-flex gap-4 flex-column flex-md-row quick-actions-container">
        {ACTIONS.map(({ path, text, icon }) => (
          <a
            key={text}
            href={path}
            className={classNames(
              'd-inline-flex align-items-center',
              'hover:shadow-sm',
              'text-decoration-none text-dark',
              'border rounded-2 p-4 gap-2 col fw-bold',
              'bg-white transition-all quick-action-item',
            )}
          >
            <DIcon
              color="primary"
              icon={icon}
              size="1.5rem"
              hasCircle
            />
            <p className="m-0">{t(`quickActions.${text}`)}</p>
            <DIcon
              className="ms-auto"
              icon="ChevronRight"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
