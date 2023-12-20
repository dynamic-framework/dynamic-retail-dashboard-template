import { DList, DListItemMovement } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import ActivityListLoader from './loaders/ActivityListLoader';
import useTransactions from '../services/hooks/useLatestActivities';

export default function LatestActivitiesList() {
  const { data, loading } = useTransactions();

  if (loading) {
    return <ActivityListLoader />;
  }

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <DList flush>
        {data.map(({
          id,
          amount,
          description,
          effectiveDate,
        }) => (
          <DListItemMovement
            key={id}
            amount={amount}
            description={description}
            date={DateTime.fromISO(effectiveDate).toFormat('dd/MM/yyyy')}
          />
        ))}
      </DList>
    </div>
  );
}
