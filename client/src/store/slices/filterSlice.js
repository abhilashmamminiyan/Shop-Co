import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draft: {
    type: null,
    price: [0, 500],
    colors: [],
    sizes: [],
    category: null
  },
  applied: {
    type: null,
    price: [0, 500],
    colors: [],
    sizes: [],
    category: null
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDraftPrice(state, action) {
      state.draft.price = action.payload;
    },
    setDraftType(state, action) {
      state.draft.type = action.payload;
    },
    setDraftCategory(state, action) {
      state.draft.category = action.payload;
    },
    toggleDraftSize(state, action) {
      const size = action.payload;
      state.draft.sizes = state.draft.sizes.includes(size)
        ? state.draft.sizes.filter(s => s !== size)
        : [...state.draft.sizes, size];
    },
    toggleDraftColor(state, action) {
      const color = action.payload;
      state.draft.colors = state.draft.colors.includes(color)
        ? state.draft.colors.filter(c => c !== color)
        : [...state.draft.colors, color];
    },

    applyFilters(state) {
      state.applied = { ...state.draft };
    },

    resetDraft(state) {
      state.draft = { ...state.applied };
    },
  },
});
export const {
  setDraftType,
  setDraftCategory,
  setDraftPrice,
  toggleDraftSize,
  toggleDraftColor,
  applyFilters,
  resetDraft,
} = filterSlice.actions;

export default filterSlice.reducer;
