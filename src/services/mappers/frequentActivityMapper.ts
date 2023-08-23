import type { ApiActivity } from '../api-interface';
import type { FrequentActivity } from '../interface';

export default function frequentActivityMapper(apiActivity: ApiActivity): FrequentActivity {
  return {
    id: apiActivity.id,
    accountNumber: apiActivity.contact.accountNumber,
    bank: apiActivity.contact.bank,
    effectiveDate: apiActivity.effectiveDate,
    name: apiActivity.contact.name,
  };
}
