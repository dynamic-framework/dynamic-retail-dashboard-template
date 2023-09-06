import classNames from 'classnames';
import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import ActivityListLoader from './loaders/ActivityListLoader';
import useTransactions from '../services/hooks/useLatestActivities';

export default function LatestActivitiesList() {
  const { data, loading } = useTransactions();
  const { format } = useFormatCurrency();

  if (loading) {
    return <ActivityListLoader />;
  }

  return (
    <div className="bg-white rounded px-4">
      {data.map((transaction) => (
        <div
          key={transaction.id}
          className="py-3 d-flex align-items-center border-bottom"
        >
          <div className="d-flex flex-column flex-grow-1">
            <p className="h6">{transaction.name}</p>
            <small className="text-light-emphasis">
              {DateTime.fromISO(transaction.effectiveDate).toFormat('dd/MM/yyyy')}
            </small>
          </div>
          <p className={classNames({
            h6: true,
            'text-danger': transaction.amount < 0,
            'text-success': transaction.amount >= 0,
          })}
          >
            {`${transaction.amount < 0 ? '-' : '+'}${format(transaction.amount)}`}
          </p>
        </div>
      ))}
    </div>
  );
}
