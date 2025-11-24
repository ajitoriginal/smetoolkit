import { create } from "zustand";

const useSubCategoryStore = create((set) => ({
  subCategoryLength: 0,
  setSubCategoryLength: (value) =>
    set((state) => {
      return { subCategoryLength: value };
    }),

  subCategoryId: "",
  setSubCategoryId: (value) =>
    set((state) => {
      return { subCategoryId: value };
    }),
}));

export default useSubCategoryStore;
