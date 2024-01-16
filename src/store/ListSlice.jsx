import { createSlice } from "@reduxjs/toolkit";

const ListSlice = createSlice({
  name: "lists",
  initialState: { loadState: true, data: [], newlistName: "" },
  reducers: {
    toggleLoad(state, action) {
      state.loadState = action.payload;
    },
    getListData(state, action) {
      state.data = action.payload;
    },
    createList(state, action) {
      console.log(action.payload);
      state.data.push(action.payload);
    },
    setListName(state, action) {
      state.newlistName = action.payload;
    },
    resetCheckListName(state) {
      state.newlistName = "";
    },
    deleteList(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      return state;
    },
  },
});

export const listActions = ListSlice.actions;

export default ListSlice;
