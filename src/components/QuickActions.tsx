import {
  DCard,
  DCardBody,
  DIcon,
} from '@dynamic-framework/ui-react';
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
    <DCard className="d-none d-xl-block">
      <DCardBody className="d-flex flex-column gap-8">
        <p className="fs-5 m-0">{t('quickActions.title')}</p>
        <div className="d-flex gap-4">
          {ACTIONS.map(({ path, text, icon }) => (
            <a
              key={text}
              href={path}
              className={classNames(
                'd-inline-flex align-items-center',
                'hover:shadow-sm',
                'text-decoration-none text-dark',
                'border rounded-1 p-4 gap-2 col fw-bold',
                'bg-white transition-all',
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
                icon="chevronRight"
                size="var(--bs-ref-spacer-4)"
              />
            </a>
          ))}
        </div>
      </DCardBody>
    </DCard>
  );
}
