// checkItemSlice.js
import { createSlice } from "@reduxjs/toolkit";

const checkItemSlice = createSlice({
  name: "checkItem",
  initialState: {
    checkItems: {}, // Object with checklistId as keys and checkItemsData as values
    newCheckItemName: {}, // Object with checklistId as keys and newCheckItem name as values
  },
  reducers: {
    getCheckItem(state, action) {
      const { checklistId, checkItemsData } = action.payload;
      state.checkItems[checklistId] = { data: checkItemsData };
    },

    deleteCheckItem(state, action) {
      const { checklistId, checkItemId } = action.payload;
      state.checkItems[checklistId].data = state.checkItems[
        checklistId
      ].data.filter((item) => item.id !== checkItemId);
    },
    createCheckItem(state, action) {
      const { newCheckItem, checklistId } = action.payload;
      state.checkItems[checklistId].data.push(newCheckItem);
    },
    setCheckItemName(state, action) {
      const { checklistId, value } = action.payload;
      state.newCheckItemName[checklistId] = value;
    },

    resetCheckItemName(state, action) {
      state.newCheckItemName = {};
    },
    updateCheckItem(state, action) {
      const { checklistId, checkItemId, updatedCheckItem } = action.payload;
      state.checkItems[checklistId].data = state.checkItems[
        checklistId
      ].data.map((item) =>
        item.id === checkItemId ? { ...item, state: updatedCheckItem } : item
      );
    },
  },
});

export const checkItemActions = checkItemSlice.actions;
export default checkItemSlice;
