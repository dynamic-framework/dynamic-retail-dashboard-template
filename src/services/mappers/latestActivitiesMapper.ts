import type { ApiActivity } from '../api-interface';
import type { Activity } from '../interface';

export default function latestActivitiesMapper(apiActivity: ApiActivity): Activity {
  return {
    id: apiActivity.id,
    accountNumber: apiActivity.contact.accountNumber,
    effectiveDate: apiActivity.effectiveDate,
    amount: apiActivity.amount,
    name: apiActivity.contact.name,
  };
}
