import type { ApiAccount, ApiResponsePaginatedWrapped } from '../api-interface';
import apiClient from '../clients/apiClient';
import accountMapper from '../mappers/accountMapper';
import metadataMapper from '../mappers/metadataMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams) {
  const { data } = await apiClient.request<ApiResponsePaginatedWrapped<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: params.config?.abortSignal,
  });

  const { metadata, content } = data;

  // We transform the account into the type of account that the widget uses
  return {
    content: content.map(accountMapper),
    metadata: metadataMapper(metadata),
  };
}
