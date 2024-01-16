import { configureStore } from "@reduxjs/toolkit";
import CheckListSlice from "./CheckListSlice";
import BoardSlice from "./BoardSlice";
import ListSlice from "./ListSlice";
export const store = configureStore({
  reducer: {
    checkList: CheckListSlice.reducer,
    board: BoardSlice.reducer,
    list: ListSlice.reducer,
  },
});
