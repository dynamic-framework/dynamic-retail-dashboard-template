import type { ControlledRequest } from '@dynamic-framework/ui';

import ApiClient from '../ApiClient';
import { ApiAccountTypeConfig } from '../config';
import accountMapper from '../mappers/accountMapper';

import type { Account } from '../interface';
import type { ApiAccount } from '../api-interface';

export function list(): ControlledRequest<Array<Account>> {
  const abortController = new AbortController();

  return {
    perform: async () => {
      const { data } = await ApiClient.request<Array<ApiAccount>>({
        url: 'accounts',
        method: 'GET',
        signal: abortController.signal,
        headers: {
          Prefer: 'code=200, example=All',
        },
      });

      return data
        // we make sure to only use accounts we can handle
        .filter((apiAccount: ApiAccount) => (
          Object.keys(ApiAccountTypeConfig).includes(apiAccount.accountType)
        ))
        // and we transform the account into the type of account that the widge uses
        .map((apiAccount: ApiAccount) => accountMapper(apiAccount));
    },
    abort: () => abortController.abort(),
  };
}
