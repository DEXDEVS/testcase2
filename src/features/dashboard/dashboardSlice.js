import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dateRange: {
    start: null,
    end: null,
    days: 30,
  },
  isRefetch: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateDateRange: (state, action) => {
      state.dateRange = { ...action.payload };
    },
    forceDashboardRefetch: (state, action) => {
      state.isRefetch = action.payload;
    },
  },
});

export const { updateDateRange, forceDashboardRefetch } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
