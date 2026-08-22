import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VehicleFilters } from "@/types/vehicle";

const initialState: VehicleFilters = {
  sortBy: "newest",
  page: 1,
  pageSize: 12,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<VehicleFilters>>) {
      return { ...state, ...action.payload, page: action.payload.page ?? 1 };
    },
    resetFilters() {
      return initialState;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setPage } = filterSlice.actions;
export default filterSlice.reducer;
