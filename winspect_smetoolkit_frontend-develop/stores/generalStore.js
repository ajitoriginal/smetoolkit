import { create } from "zustand";

const useGenerateStore = create((set) => ({
  isCustom: false,
  setIsCustom: (value) =>
    set((state) => {
      return { isCustom: value };
    }),

  isDraft: false,
  setIsDraft: (value) =>
    set((state) => {
      return { isDraft: value };
    }),

  showAddDraftPopup: false,
  setShowAddDraftPopup: (value) =>
    set((state) => {
      return { showAddDraftPopup: value };
    }),

  createNewstate: null,
  setCreateNewstate: (value) =>
    set((state) => {
      return { createNewstate: value };
    }),
}));

export default useGenerateStore;
