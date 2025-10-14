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
    <div className="d-none d-xl-block mb-8">
      <div className="d-flex flex-column gap-8">
        <div className="d-flex gap-4">
          {ACTIONS.map(({ path, text, icon }) => (
            <a
              key={text}
              href={path}
              className={classNames(
                'd-inline-flex align-items-center',
                'text-decoration-none text-dark',
                'rounded-1 p-4 gap-2 col',
                'card-hover',
              )}
            >
              <DIcon
                className="bg-secondary-100"
                icon={icon}
                size="var(--bs-ref-spacer-3)"
                circleSize="var(--bs-ref-spacer-5)"
                hasCircle
              />
              <div className="d-flex flex-grow-1 align-items-center">
                <div className="flex-grow-1">
                  <h5 className="m-0 fw-bold">{t(`quickActions.${text}`)}</h5>
                  <small className="text-muted">Transfiere a terceos</small>
                </div>
                <DIcon
                  className="ms-auto"
                  icon="chevron-right"
                  size="var(--bs-ref-spacer-4)"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
