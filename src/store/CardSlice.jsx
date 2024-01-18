// cardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cardsData: {}, // Object with cardId as keys and cardData as values
    newCardName: {}, // Object with cardId as keys and newCardName as values
  },
  reducers: {
    getCard(state, action) {
      const { id, cardsData } = action.payload;
      state.cardsData[id] = { data: cardsData };
    },

    deleteCard(state, action) {
      const { deletedId } = action.payload;
      delete state.cardsData[deletedId];
    },
    createCards(state, action) {
      const { data, id } = action.payload;
      if (state.cardsData[id]) {
        state.cardsData[id].data.push(data);
      } else {
        state.cardsData[id] = { data: [data] };
      }
    },
    setCardName(state, action) {
      const { id, value } = action.payload;
      state.newCardName[id] = value;
    },

    resetCardName(state) {
      state.newCardName = {};
    },
    updateCards(state, action) {
      const { id, updatedCard } = action.payload;
      state.cardsData[id].data = state.cardsData[id].data.map((card) =>
        card.id === id ? { ...card, state: updatedCard } : card
      );
    },
  },
});

export const cardActions = cardSlice.actions;
export default cardSlice;
