import { createSlice } from "@reduxjs/toolkit";

const BoardSlice = createSlice({
  name: "boards",
  initialState: { open: false, data: [], newBoardName: "" },
  reducers: {
    toggleModal(state) {
      state.open = !state.open;
    },
    getBoardData(state, action) {
      state.data = action.payload;
    },
    createBoard(state, action) {
      console.log(action.payload);
      state.data.push(action.payload);
    },
    setBoardName(state, action) {
      state.newBoardName = action.payload;
    },
  },
});

export const boardActions = BoardSlice.actions;

export default BoardSlice;
