import { create } from "zustand";

const useFilterStore = create((set) => ({
  showCalendar: false,
  setShowCalendar: (value) =>
    set((state) => {
      return { showCalendar: value };
    }),

  dateRange: { startDate: null, endDate: null },
  setDateRange: (value) =>
    set((state) => {
      return { dateRange: value };
    }),

  dateOption: { label: "Any time" },
  setDateOption: (value) =>
    set((state) => {
      return { dateOption: value };
    }),

  showSimilarityRangePopup: false,
  setShowSimilarityRangePopup: (value) =>
    set((state) => {
      return { showSimilarityRangePopup: value };
    }),

  debouncedSearchTerm: "",
  setDebouncedSearchTerm: (value) =>
    set((state) => {
      return { debouncedSearchTerm: value };
    }),

  similarityRange: {
    similarityStart: null,
    similarityEnd: null,
  },
  setSimilarityRange: (value) =>
    set((state) => {
      return { similarityRange: value };
    }),

  similarityOption: { label: "All" },
  setSimilarityOption: (value) =>
    set((state) => {
      return { similarityOption: value };
    }),

  usedByOption: [],
  setUsedByOption: (value) =>
    set((state) => {
      return { usedByOption: value };
    }),
  selectedOfficeIds: "",
  setSelectedOfficeIds: (value) =>
    set((state) => {
      return { selectedOfficeIds: value };
    }),

  addedByOption: [],
  setAddedByOption: (value) =>
    set((state) => {
      return { addedByOption: value };
    }),

  customRemarkAuthors: "",
  setCustomRemarkAuthors: (value) =>
    set((state) => {
      return { customRemarkAuthors: value };
    }),
}));

export default useFilterStore;
