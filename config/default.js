import { ls } from '../getLocalStorage.js';

export const config = {
  apiURL: 'http://localhost:3000/api',
  hobbyAuth: 'hobbyAuth',
  fetchOption: {
    headers: {
      'X-Access-Token': ls.hobbyAuth.accessToken,
      'X-Refresh-Token': ls.hobbyAuth.refreshToken,
    },
  },
};
