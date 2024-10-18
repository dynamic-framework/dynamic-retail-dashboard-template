import { DCard, DCardBody, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

const actions = [
  {
    text: 'Transfer',
    path: '',
    icon: 'arrow-left-right',
  },
  {
    text: 'Pay Service',
    path: '',
    icon: 'cash-stack',
  },
  {
    text: 'Invest',
    path: '',
    icon: 'bank2',
  },
];

export default function QuickActions() {
  return (
    <DCard className="d-none d-lg-block text-bg-secondary-600">
      <DCardBody className="d-flex flex-column gap-8">
        {/* TODO: Change this */}
        <p className="fs-5 m-0">What would you like to do today?</p>
        <div className="d-flex gap-4">
          {actions.map(({ path, text, icon }) => (
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
              <p className="m-0">{text}</p>
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
