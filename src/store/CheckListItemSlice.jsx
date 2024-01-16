import { createSlice } from "@reduxjs/toolkit";
const CheckListItemSlice = createSlice({
  name: "checklistitem",
  initialState: {
    checkListItemNames: {}, // Corrected property name
    checklistitem: [],
    newCheckListItemName: "",
  },
  reducers: {
    createCheckListItem(state, action) {
      state.checklistitem.push(action.payload);
    },
    setCheckListItemName(state, action) {
      const { key, value } = action.payload;
      state.checkListItemNames[key] = value; // Corrected property name
    },
    resetCheckListItemName(state) {
      state.newCheckListItemName = ""; // Corrected property name
    },
    updateCheckItem(state, action) {
      state.checklistitem = state.checklistitem.map((item) =>
        item.id === action.payload.checkItemId
          ? { ...item, state: action.payload.updatedState }
          : item
      );
      return state;
    },
  },
});

export const checklistItemActions = CheckListItemSlice.actions;

export default CheckListItemSlice;
