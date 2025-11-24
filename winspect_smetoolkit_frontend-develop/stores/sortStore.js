import { create } from "zustand";

const useSortStore = create((set) => ({
  sortBy: null,
  setSortBy: (value) =>
    set((state) => {
      return { sortBy: value };
    }),

  sortByLabel: {
    label: "Recently Added",
    value: "Recently Added",
  },
  setSortByLabel: (value) =>
    set((state) => {
      return { sortByLabel: value };
    }),

  sortLoader: false,
  setSortLoader: (value) =>
    set((state) => {
      return { sortLoader: value };
    }),
}));

export default useSortStore;
