import { DCard, DCardBody, DIcon } from '@dynamic-framework/ui-react';
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
    icon: 'arrow-left-right',
  },
  {
    text: 'payService',
    path: PAYMENTS_URL,
    icon: 'cash-stack',
  },
  {
    text: 'invest',
    path: INVESTMENT_URL,
    icon: 'bank2',
  },
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <DCard className="d-none d-lg-block text-bg-secondary-600">
      <DCardBody className="d-flex flex-column gap-8">
        <p className="fs-5 m-0">{t('quickActions.title')}</p>
        <div className="d-flex gap-4">
          {ACTIONS.map(({ path, text, icon }) => (
            <a
              key={text}
              href={path}
              className={classNames(
                'd-inline-flex align-items-center',
                'text-decoration-none bg-secondary-200 text-white bg-opacity-25',
                'border rounded-1 p-4 gap-2 col fw-bold',
              )}
            >
              <DIcon
                className="bg-white bg-opacity-75 text-secondary"
                icon={icon}
                size="var(--bs-ref-spacer-3)"
                circleSize="var(--bs-ref-spacer-5)"
                hasCircle
              />
              <p className="m-0">{t(`quickActions.${text}`)}</p>
              <DIcon
                className="ms-auto"
                icon="chevron-right"
                size="var(--bs-ref-spacer-4)"
              />
            </a>
          ))}
        </div>
      </DCardBody>
    </DCard>
  );
}
