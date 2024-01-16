import { configureStore } from "@reduxjs/toolkit";
import CheckListSlice from "./CheckListSlice";
import BoardSlice from "./BoardSlice";
export const store = configureStore({
  reducer: {
    checkList: CheckListSlice.reducer,
    board: BoardSlice.reducer,
  },
});
