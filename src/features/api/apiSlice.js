import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedOut } from '../auth/authSlice';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithCredentials = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

const customBaseQuery = async (args, api, extraOptions) => {
  let result;

  if (
    args === '/refresh-token' ||
    args?.url === '/login' ||
    args?.url === '/logout'
  ) {
    result = await baseQueryWithCredentials(args, api, extraOptions);
  } else {
    result = await baseQuery(args, api, extraOptions);
  }

  if (result?.error?.status === 401) {
    api.dispatch(userLoggedOut());
    sessionStorage.clear();
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['ArchivedCards', 'Cards'],
  endpoints: (builder) => ({}),
});
