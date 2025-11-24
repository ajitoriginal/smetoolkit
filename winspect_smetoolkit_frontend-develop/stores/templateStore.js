import { create } from "zustand";

const useTemplateStore = create((set) => ({
  currentTemplateDetail: 0,
  setCurrentTemplateDetail: (value) =>
    set((state) => {
      return { currentTemplateDetail: value };
    }),

  subCategoryId: "",
  setSubCategoryId: (value) =>
    set((state) => {
      return { subCategoryId: value };
    }),
}));

export default useTemplateStore;
