import type { GenericAbortSignal } from 'axios';

import apiClient from '../clients/apiClient';

import latestActivitiesMapper from '../mappers/latestActivitiesMapper';
import { ApiActivity } from '../api-interface';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await apiClient.request<Array<ApiActivity>>({
    url: 'deposit/frequent/activity',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data.map((apiActivity) => latestActivitiesMapper(apiActivity));
}
