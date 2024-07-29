import { apiSlice } from '../api/apiSlice';
import { forceDashboardRefetch } from '../dashboard/dashboardSlice';
import { setSerachResultRefetch, updateDraggableCards } from './cardsSlice';

export const cardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query({
      query: () => '/cards',
      providesTags: ['Cards'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateDraggableCards(true));
        } catch {
          // do nothing
        }
      },
    }),
    getCardsByClientName: builder.query({
      query: (clientName) => `/cardlist/${clientName}`,
    }),
    getArchivedCards: builder.query({
      query: () => '/cards/archived',
      providesTags: ['ArchivedCards'],
    }),
    addCards: builder.mutation({
      query: (data) => ({
        url: '/cards/add',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(forceDashboardRefetch(true));
          dispatch(apiSlice.util.invalidateTags(['Cards']));
        } catch {
          // do nothing
        }
      },
    }),
    editCard: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cards/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getCards', undefined, (draft) => {
            const card = draft.data.find((card) => card.id === id);
            if (card) {
              Object.assign(card, data);
            }
          })
        );
        dispatch(updateDraggableCards(true));
        try {
          await queryFulfilled;
          dispatch(setSerachResultRefetch(true));
          dispatch(forceDashboardRefetch(true));
        } catch {
          patchResult.undo();
        }
      },
    }),
    moveSingleCardToArchive: builder.mutation({
      query: (id) => ({
        url: `/cards/movetoarchive/${id}`,
        method: 'PUT',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setSerachResultRefetch(true));
          dispatch(forceDashboardRefetch(true));
          dispatch(apiSlice.util.invalidateTags(['Cards', 'ArchivedCards']));
        } catch {
          // do nothing
        }
      },
    }),
    restoreCardFromArchive: builder.mutation({
      query: (id) => ({
        url: `/cards/archived/restoresinglecard/${id}`,
        method: 'PATCH',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setSerachResultRefetch(true));
          dispatch(forceDashboardRefetch(true));
          dispatch(apiSlice.util.invalidateTags(['Cards', 'ArchivedCards']));
        } catch {
          // do nothing
        }
      },
    }),
    moveCardListToArchive: builder.mutation({
      query: (status) => ({
        url: `/cardlist/movetoarchive/${status}`,
        method: 'PUT',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(forceDashboardRefetch(true));
          dispatch(apiSlice.util.invalidateTags(['Cards', 'ArchivedCards']));
        } catch {
          // do nothing
        }
      },
    }),
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `/cards/delete/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setSerachResultRefetch(true));
          dispatch(forceDashboardRefetch(true));
        } catch {
          // do nothing
        }
      },
      invalidatesTags: ['Cards'],
    }),
    deleteCardList: builder.mutation({
      query: (status) => ({
        url: `/cardlist/delete/${status}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardsByClientNameQuery,
  useGetArchivedCardsQuery,
  useAddCardsMutation,
  useEditCardMutation,
  useMoveSingleCardToArchiveMutation,
  useMoveCardListToArchiveMutation,
  useDeleteCardMutation,
  useDeleteCardListMutation,
  useRestoreCardFromArchiveMutation,
} = cardsApi;
