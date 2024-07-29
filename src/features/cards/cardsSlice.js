import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editingCard: {},
  isUpdateDraggabeCards: false,
  isRefetch: false,
};

export const cardsSlice = createSlice({
  name: 'cardsSlice',
  initialState,
  reducers: {
    addEditCardData: (state, action) => {
      state.editingCard = { ...action.payload };
    },
    removeEditCardData: (state) => {
      state.editingCard = {};
    },
    updateDraggableCards: (state, action) => {
      state.isUpdateDraggabeCards = action.payload;
    },
    setSerachResultRefetch: (state, action) => {
      state.isRefetch = action.payload;
    },
  },
});

export const {
  addEditCardData,
  removeEditCardData,
  updateDraggableCards,
  setSerachResultRefetch,
} = cardsSlice.actions;

export default cardsSlice.reducer;
