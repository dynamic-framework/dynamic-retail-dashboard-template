/* eslint-disable react/jsx-props-no-spreading */
import { DListItem, useFormatCurrency } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useMemo } from 'react';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof DListItem>, 'children'> & {
  description: string;
  date: string;
  amount: number;
};

export default function ListItemMovement(
  {
    description,
    date,
    amount,
    style,
    ...props
  }: Props,
) {
  const { format } = useFormatCurrency();
  const value = useMemo(() => {
    const valueFormatted = format(amount);
    if (amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted,
      };
    }
    return {
      theme: 'text-danger',
      valueFormatted,
    };
  }, [format, amount]);

  return (
    <DListItem {...props}>
      <div className="d-flex justify-content-between align-items-center px-1 py-2 gap-4">
        <div className="d-flex flex-column gap-1">
          <span className="fs-6">
            {description}
          </span>
          <span className="small text-gray-700">
            {date}
          </span>
        </div>
        <span className={classNames('fs-6', value.theme)}>
          {value.valueFormatted}
        </span>
      </div>
    </DListItem>
  );
}
