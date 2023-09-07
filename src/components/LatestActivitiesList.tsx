import { DList, DListItemMovement } from '@dynamic-framework/ui-react';
import ActivityListLoader from './loaders/ActivityListLoader';
import useTransactions from '../services/hooks/useLatestActivities';

export default function LatestActivitiesList() {
  const { data, loading } = useTransactions();

  if (loading) {
    return <ActivityListLoader />;
  }

  return (
    <div className="bg-white rounded px-3">
      <DList isFlush>
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
            date={effectiveDate}
          />
        ))}
      </DList>
    </div>
  );
}
