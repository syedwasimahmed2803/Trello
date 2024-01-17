import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
  name: "cards",
  initialState: {
    cardsData: [],
    newCardName: [],
  },
  reducers: {
    getCard(state, action) {
      const cardIndex = state.cardsData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cardIndex === -1) {
        state.cardsData.push({
          id: action.payload.id,
          data: action.payload.cardsData,
        });
      } else {
        state.cardsData.map((item) => {
          if (item.id == action.payload.id) {
            return { ...item, data: action.payload.cardsData };
          } else {
            return item;
          }
        });
      }
    },

    deleteCards(state, action) {
      state.cardsData = state.cardsData.map((item) => {
        return {
          ...item,
          data: item.data.filter((value) => value.id !== action.payload),
        };
      });
      return state;
    },
    createCards(state, action) {
      const { data, id } = action.payload;

      const cardIndex = state.newCardName.findIndex((item) => item.id === id);
      if (cardIndex !== -1) {
        state.cardsData[cardIndex].data.push(data);
      } else {
        state.cardsData.push({ id: id, data: [data] });
      }

      return state;
    },
    setCardName(state, action) {
      const existingCheckItem = state.newCardName.find(
        (item) => item.id === action.payload.id
      );

      if (existingCheckItem) {
        existingCheckItem.name = action.payload.value;
      } else {
        state.newCardName.push({
          id: action.payload.id,
          name: action.payload.value,
        });
      }
    },

    resetCardName(state) {
      state.newCardName = [];
    },
    updateCards(state, action) {
      state.cardsData = state.cardsData.map((item) => {
        return {
          ...item,
          data: item.data.map((a) => {
            if (a.id === action.payload.id) {
              return { ...a, state: action.payload.updatedCard };
            } else {
              return a;
            }
          }),
        };
      });
    },
  },
});

export const CardActions = CardSlice.actions;
export default CardSlice;
