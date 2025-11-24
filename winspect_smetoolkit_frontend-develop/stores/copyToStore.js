import { create } from "zustand";

const useCopyToStore = create((set) => ({
  copyTo: "",
  setCopyTo: (value) =>
    set((state) => {
      return { copyTo: value };
    }),

  selectedTemplate: "",
  setSelectedTemplate: (value) =>
    set((state) => {
      return { selectedTemplate: value };
    }),

  selectedCategory: "",
  setSelectedCategory: (value) =>
    set((state) => {
      return { selectedCategory: value };
    }),

  selectedSubCategory: "",
  setSelectedSubCategory: (value) =>
    set((state) => {
      return { selectedSubCategory: value };
    }),

  step: 1,
  setStep: (value) =>
    set((state) => {
      return { step: value };
    }),

  showCopyToPopup: false,
  setShowCopyToPopup: (value) =>
    set((state) => {
      return { showCopyToPopup: value };
    }),

  selectedSubCategoriesToCopy: [],
  setSelectedSubCategoriesToCopy: (value) =>
    set((state) => {
      return { selectedSubCategoriesToCopy: value };
    }),

  showCategoryCheckboxes: false,
  setShowCategoryCheckboxes: (value) =>
    set((state) => {
      return { showCategoryCheckboxes: value };
    }),

  showSubCategoryCheckboxes: false,
  setShowSubCategoryCheckboxes: (value) =>
    set((state) => {
      return { showSubCategoryCheckboxes: value };
    }),

  showAboutCheckboxes: false,
  setShowAboutCheckboxes: (value) =>
    set((state) => {
      return { showAboutCheckboxes: value };
    }),

  selectedCategoriesToCopy: [],
  setSelectedCategoriesToCopy: (value) =>
    set((state) => {
      return { selectedCategoriesToCopy: value };
    }),

  selectedAboutToCopy: [],
  setSelectedAboutToCopy: (value) =>
    set((state) => {
      return { selectedAboutToCopy: value };
    }),

  selectedRemarkToCopy: [],
  setSelectedRemarkToCopy: (value) =>
    set((state) => {
      return { selectedRemarkToCopy: value };
    }),

  showRemarkCheckboxes: false,
  setShowRemarkCheckboxes: (value) =>
    set((state) => {
      return { showRemarkCheckboxes: value };
    }),
}));

export default useCopyToStore;
