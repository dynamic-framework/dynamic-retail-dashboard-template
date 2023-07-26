import { ControlledRequest } from '@dynamic-framework/ui';

import ApiClient from '../ApiClient';
import contactMapper from '../mappers/contactMapper';

import type { Contact } from '../interface';

export function list(): ControlledRequest<Array<Contact>> {
  const abortController = new AbortController();

  return {
    perform: async () => {
      const { data } = await ApiClient.request<Array<Contact>>({
        url: 'contacts',
        method: 'GET',
        headers: {
          Prefer: 'code=200, example=All',
        },
      });

      return data.map((apiContact) => contactMapper(apiContact));
    },
    abort: () => abortController.abort(),
  };
}
