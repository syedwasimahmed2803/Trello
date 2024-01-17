import { configureStore } from "@reduxjs/toolkit";
import CheckListSlice from "./CheckListSlice";
import BoardSlice from "./BoardSlice";
import ListSlice from "./ListSlice";
import checkItemSlice from "./CheckItemSLice";
export const store = configureStore({
  reducer: {
    checkList: CheckListSlice.reducer,
    board: BoardSlice.reducer,
    list: ListSlice.reducer,
    checkItem: checkItemSlice.reducer,
  },
});
