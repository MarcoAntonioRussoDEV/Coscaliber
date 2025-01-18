import { configureStore } from "@reduxjs/toolkit";
import lineSlice from "./Redux-Slices/lineSlicePREV";

export const store = configureStore({
    reducer: {
        lines: lineSlice,
    },
});

export default store;
