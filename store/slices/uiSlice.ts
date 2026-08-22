import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  commandPaletteOpen: boolean;
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  mobileFilterDrawerOpen: boolean;
}

const initialState: UiState = {
  commandPaletteOpen: false,
  sidebarCollapsed: false,
  mobileNavOpen: false,
  mobileFilterDrawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCommandPaletteOpen(state, action: PayloadAction<boolean>) {
      state.commandPaletteOpen = action.payload;
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setMobileFilterDrawerOpen(state, action: PayloadAction<boolean>) {
      state.mobileFilterDrawerOpen = action.payload;
    },
  },
});

export const {
  setCommandPaletteOpen,
  toggleSidebarCollapsed,
  setMobileNavOpen,
  setMobileFilterDrawerOpen,
} = uiSlice.actions;
export default uiSlice.reducer;
