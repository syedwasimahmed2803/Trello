import { createSlice } from "@reduxjs/toolkit";

const checkItemSlice = createSlice({
  name: "checkItem",
  initialState: {
    checkItemsData: [],
    newCheckItemName: [],
  },
  reducers: {
    getCheckItem(state, action) {
      const checklistIndex = state.checkItemsData.findIndex(
        (item) => item.id === action.payload.id
      );
      if (checklistIndex === -1) {
        state.checkItemsData.push({
          id: action.payload.id,
          data: action.payload.checkItemsData,
        });
      } else {
        state.checkItemsData.map((item) => {
          if (item.idChecklist == action.payload.id) {
            return { ...item, data: action.payload.checkItemsData };
          } else {
            return item;
          }
        });
      }
    },

    deleteCheckItem(state, action) {
      state.checkItemsData = state.checkItemsData.map((item) => {
        return {
          ...item,
          data: item.data.filter((value) => value.id !== action.payload),
        };
      });
      return state;
    },
    createCheckItem(state, action) {
      const { data, id } = action.payload;

      const checklistIndex = state.newCheckItemName.findIndex(
        (item) => item.id === id
      );
      if (checklistIndex !== -1) {
        state.checkItemsData[checklistIndex].data.push(data);
      } else {
        state.checkItemsData.push({ id: id, data: [data] });
      }

      return state;
    },
    setcheckItemName(state, action) {
      const existingCheckItem = state.newCheckItemName.find(
        (item) => item.id === action.payload.id
      );

      if (existingCheckItem) {
        existingCheckItem.name = action.payload.value;
      } else {
        state.newCheckItemName.push({
          id: action.payload.id,
          name: action.payload.value,
        });
      }
    },

    resetcheckItemName(state) {
      state.newCheckItemName = [];
    },
    updatecheckItem(state, action) {
      state.checkItemsData = state.checkItemsData.map((item) => {
        return {
          ...item,
          data: item.data.map((a) => {
            if (a.id === action.payload.checkItemId) {
              return { ...a, state: action.payload.updatedCheckItem };
            } else {
              return a;
            }
          }),
        };
      });
    },
  },
});

export const checkItemActions = checkItemSlice.actions;
export default checkItemSlice;
