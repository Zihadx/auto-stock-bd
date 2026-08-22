import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  vehicleIds: string[];
}

const initialState: FavoritesState = { vehicleIds: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.vehicleIds = state.vehicleIds.includes(id)
        ? state.vehicleIds.filter((existing) => existing !== id)
        : [...state.vehicleIds, id];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
