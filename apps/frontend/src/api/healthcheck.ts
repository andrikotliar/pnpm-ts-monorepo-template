import { apiClient } from '~/shared';

export const healthcheckApi = {
  getStatus: async () => {
    return await apiClient.get<{ status: string }>('/healthcheck');
  },
};
