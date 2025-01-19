import { configureStore } from "@reduxjs/toolkit";
import lineSlice from "./Redux-Slices/lineSlice";

export const store = configureStore({
    reducer: {
        lines: lineSlice,
    },
});

export default store;
