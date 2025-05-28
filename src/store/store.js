import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../features/homeSlice";
import pageActionSlice from "../features/pageActionSlice";

export const store = configureStore({
  reducer: {
    homeSlice,
    pageActionSlice
  }
});