import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import uiReducer from "./slices/uiSlice";
import favoritesReducer from "./slices/favoritesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      filters: filterReducer,
      ui: uiReducer,
      favorites: favoritesReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
