import { apiSlice } from '../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalOrdersCount: builder.query({
      query: ({ start, end, days }) => {
        let queryString;
        if (start && end) {
          queryString = `startDate=${start.toString()}&endDate=${end.toString()}`;
        } else {
          queryString = `days=${days}&endDate=${new Date().toString()}`;
        }
        return `/dashboard/totalCardsCount?${queryString}`;
      },
    }),
    getPieChartData: builder.query({
      query: ({ start, end, days }) => {
        let queryString;
        if (start && end) {
          queryString = `startDate=${start.toString()}&endDate=${end.toString()}`;
        } else {
          queryString = `days=${days}&endDate=${new Date().toString()}`;
        }
        return `/dashboard/pieChartData?${queryString}`;
      },
    }),
    getLineChartData: builder.query({
      query: ({ start, end, days }) => {
        let queryString;
        if (start && end) {
          queryString = `startDate=${start.toString()}&endDate=${end.toString()}`;
        } else {
          queryString = `days=${days}&endDate=${new Date().toString()}`;
        }
        return `/dashboard/lineChartData?${queryString}`;
      },
    }),
    getNearestDeadlineOrders: builder.query({
      query: () => '/dashboard/nearestDeadlineOrders',
    }),
  }),
});

export const {
  useGetTotalOrdersCountQuery,
  useGetPieChartDataQuery,
  useGetLineChartDataQuery,
  useGetNearestDeadlineOrdersQuery,
} = dashboardApi;
