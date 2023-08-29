import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  label: string;
  value: ReactNode;
  className?: string;
};

export default function CollapseItemDetail({
  label,
  value,
  className,
}: Props) {
  return (
    <>
      <div className={classNames(
        'col-6 border-bottom border-gray-200 py-3 bg-gray-100',
        className,
      )}
      >
        <small className="text-gray-900">
          {label}
        </small>
      </div>
      <div className={classNames(
        'col-6 border-bottom border-gray-200 py-3 text-center',
        className,
      )}
      >
        <small className="text-gray-700">
          {value}
        </small>
      </div>
    </>
  );
}
