import apiClient from 'services/apiService';

export const tradesServices = {
  Trades(pair) {
    return apiClient.request({
      method: 'GET',
      url: `/api-svc/trade/getAllTrade?symbol=${pair}`,
    });
  },
};
