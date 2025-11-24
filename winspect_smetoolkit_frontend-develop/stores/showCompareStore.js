import { create } from "zustand";

const useShowCompareStore = create((set) => ({
  showCompare: false,
  setShowCompare: (value) =>
    set((state) => {
      return { showCompare: value };
    }),
}));

export default useShowCompareStore;
