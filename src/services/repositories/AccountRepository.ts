import type { GenericAbortSignal } from 'axios';

import type { ApiAccount, ApiResponsePaginatedWrapped } from '../api-interface';
import apiClient from '../clients/apiClient';
import accountMapper from '../mappers/accountMapper';
import metadataMapper from '../mappers/metadataMapper';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await apiClient.request<ApiResponsePaginatedWrapped<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  const { metadata, content } = data;

  // We transform the account into the type of account that the widget uses
  return {
    content: content.map(accountMapper),
    metadata: metadataMapper(metadata),
  };
}
