import { create } from "zustand";

const useRmarkPaginationStore = create((set) => ({
  currentPage: 0,
  setCurrentPage: (value) =>
    set((state) => {
      return { currentPage: value };
    }),

  totalPages: 0,
  setTotalPages: (value) =>
    set((state) => {
      return { totalPages: Math.ceil(value / 10) };
    }),
}));

export default useRmarkPaginationStore;
