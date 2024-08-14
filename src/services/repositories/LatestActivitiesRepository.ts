import type { GenericAbortSignal } from 'axios';

import { ApiActivity } from '../api-interface';
import apiClient from '../clients/apiClient';
import latestActivitiesMapper from '../mappers/latestActivitiesMapper';

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
