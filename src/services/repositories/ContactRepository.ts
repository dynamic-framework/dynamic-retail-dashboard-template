import type { GenericAbortSignal } from 'axios';

import apiClient from '../clients/apiClient';
import contactMapper from '../mappers/contactMapper';

import type { Contact } from '../interface';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await apiClient.request<Array<Contact>>({
    url: 'contacts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data.map((apiContact) => contactMapper(apiContact));
}
