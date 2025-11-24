import { create } from "zustand";

const useCategoryStore = create((set) => ({
  categoryId: "",
  setCategoryId: (value) =>
    set((state) => {
      return { categoryId: value };
    }),

  categoryLength: 0,
  setCategoryLength: (value) =>
    set((state) => {
      return { categoryLength: value };
    }),

  progressReportCount: 0,
  setProgressReportCount: (value) =>
    set((state) => {
      return { progressReportCount: value };
    }),
}));

export default useCategoryStore;
