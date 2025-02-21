import type { ApiAccount } from '../api-interface';
import {
  AccountBaseType,
  ApiAccountTypeConfig,
} from '../config';
import type { Account } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): Account {
  const baseType = apiAccount.type.toLowerCase() as AccountBaseType;

  const commonProps = {
    id: apiAccount.id,
    name: apiAccount.account_name,
    accountNumber: apiAccount.masked_number,
    type: ApiAccountTypeConfig[apiAccount.group],
  };

  if (baseType === AccountBaseType.Loan) {
    return {
      ...commonProps,
      baseType,
      balanceOwed: apiAccount.loan?.details.balance.owed as number,
      balanceRemaining: apiAccount.loan?.details.balance.remaining as number,
    };
  }

  return {
    ...commonProps,
    baseType,
    balanceAvailable: apiAccount.deposit?.balance.available.total as number,
  };
}
