import type { GenericAbortSignal } from 'axios';

import apiClient from '../clients/apiClient';
import accountMapper from '../mappers/accountMapper';
import { ApiAccountTypeConfig } from '../config';

import type { ApiAccount } from '../api-interface';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await apiClient.request<Array<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data
    // we make sure to only use accounts we can handle
    .filter((apiAccount: ApiAccount) => (
      Object.keys(ApiAccountTypeConfig).includes(apiAccount.accountType)
    ))
    // and we transform the account into the type of account that the widget uses
    .map((apiAccount: ApiAccount) => accountMapper(apiAccount));
}
