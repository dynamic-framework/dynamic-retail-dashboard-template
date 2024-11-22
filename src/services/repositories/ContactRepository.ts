import type { GenericAbortSignal } from 'axios';

import { ApiContact, ApiResponsePaginatedWrapped } from '../api-interface';
import apiClient from '../clients/apiClient';
import contactMapper from '../mappers/contactMapper';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await apiClient.request<ApiResponsePaginatedWrapped<ApiContact>>({
    url: '/account-holder/contacts/deposit-accounts',
    method: 'GET',
    signal: config.abortSignal,
  });

  return data.content.map(contactMapper);
}
