import type { ApiActivity } from '../api-interface';
import type { Activity } from '../interface';

export default function frequentActivityMapper(apiActivity: ApiActivity): Activity {
  return {
    id: apiActivity.id,
    accountNumber: apiActivity.contact.accountNumber,
    bank: apiActivity.contact.bank,
    effectiveDate: apiActivity.effectiveDate,
    name: apiActivity.contact.name,
  };
}
