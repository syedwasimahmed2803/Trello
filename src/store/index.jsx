import { configureStore } from "@reduxjs/toolkit";
import CheckListSlice from "./CheckListSlice";
import CheckListItemSlice from "./CheckListItemSlice";
export const store = configureStore({
  reducer: {
    checkList: CheckListSlice.reducer,
    checkListItem: CheckListItemSlice.reducer,
  },
});
