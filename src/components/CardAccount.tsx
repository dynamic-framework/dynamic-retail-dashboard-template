import { DButton, DCard, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

type Props =
& {
  className?: string;
  icon: string;
  theme: string;
  name: string;
  number: string;
  balance: string;
  balanceText: string;
  onClick: () => void;
  actionText: string;
};

export default function CardAccount(
  {
    className,
    icon,
    theme,
    name,
    number,
    balance,
    balanceText,
    onClick,
    actionText,
  }: Props,
) {
  return (
    <DCard
      className={classNames(
        'd-card-account',
        className,
      )}
    >
      <DCard.Body>
        <div className="d-flex gap-4 align-items-center">
          <DIcon
            icon={icon}
            hasCircle
            theme={theme}
            size="1.5rem"
          />
          <div className="d-block flex-grow-1">
            <p className="text-gray-700 mb-0">
              {name}
            </p>
            <small className="text-gray-500">
              {number}
            </small>
          </div>
        </div>
        <div className="d-block">
          <p className="fw-bold fs-6 text-body mb-0">
            {balance}
          </p>
          <small className="text-gray-700">
            {balanceText}
          </small>
        </div>
        <div className="d-flex justify-content-end">
          <DButton
            text={actionText}
            variant="link"
            size="sm"
            theme="secondary"
            iconEnd="chevron-right"
            onClick={onClick}
          />
        </div>
      </DCard.Body>
    </DCard>
  );
}
