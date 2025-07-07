import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productsSlice";
import { commentsSlice } from "./slices/commentsSlice";

const rootReducer = combineSlices({
  products: productsSlice.reducer,
  comments: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
