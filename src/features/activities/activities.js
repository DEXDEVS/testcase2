import { apiSlice } from '../api/apiSlice';

export const activitiesapi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => '/activities',
    }),
    getMoreActivities: builder.query({
      query: (page) => `/activities?page=${page}`,

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                'getActivities',
                undefined,
                (draft) => {
                  draft.data = [...draft.data, ...data.data];
                  return draft;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetActivitiesQuery, useGetMoreActivitiesQuery } =
  activitiesapi;
