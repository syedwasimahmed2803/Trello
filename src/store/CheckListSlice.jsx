import { createSlice } from "@reduxjs/toolkit";

const CheckListSlice = createSlice({
  name: "checklist",
  initialState: { open: false, checklist: [], newCheckListName: "" },
  reducers: {
    toggleModal(state) {
      state.open = !state.open;
    },
    getCheckListData(state, action) {
      state.checklist = action.payload;
    },
    deleteCheckList(state, action) {
      state.checklist = state.checklist.filter(
        (item) => item.id !== action.payload
      );
      return state;
    },
    createCheckList(state, action) {
      console.log(action.payload);
      state.checklist.push(action.payload);
    },
    setCheckListName(state, action) {
      state.newCheckListName = action.payload;
    },
    resetCheckListName(state) {
      state.newCheckListName = "";
    },
  },
});

export const checklistActions = CheckListSlice.actions;

export default CheckListSlice;
