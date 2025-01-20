import { configureStore } from "@reduxjs/toolkit";
import { reducer as weatherReducer } from "../../../store/model/slices/weatherSlice";

export const store = configureStore({
  reducer: {
    weatherReducer: weatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
