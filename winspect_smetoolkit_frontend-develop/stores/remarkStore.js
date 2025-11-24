import { create } from "zustand";

const useRemarkStore = create((set) => ({
  showAddDefaultPopup: false,
  setShowAddDefaultPopup: (value) =>
    set((state) => {
      return { showAddDefaultPopup: value };
    }),

  showDeselectDefautl: false,
  setShowDeselectDefault: (value) =>
    set((state) => {
      return { showDeselectDefautl: value };
    }),

  showRemarkUtilization: false,
  setShowRemarkUtilization: (value) =>
    set((state) => {
      return { showRemarkUtilization: value };
    }),

  selectedRemarkForFrequencies: null,
  setSelectedRemarkForFrequencies: (value) =>
    set((state) => {
      return { selectedRemarkForFrequencies: value };
    }),

  selectedRemarkForGroupView: null,
  setSelectedRemarkForGroupView: (value) =>
    set((state) => {
      return { selectedRemarkForGroupView: value };
    }),

  nearestTemplateRemarkIdStore: null,
  setNearestTemplateRemarkIdStore: (value) =>
    set((state) => {
      return { nearestTemplateRemarkIdStore: value };
    }),

  showDeleteRemarkPopup: false,
  setShowDeleteRemarkPopup: (value) =>
    set((state) => {
      return { showDeleteRemarkPopup: value };
    }),

  showRecoverRemarkPopup: false,
  setShowRecoverRemarkPopup: (value) =>
    set((state) => {
      return { showRecoverRemarkPopup: value };
    }),

  showMoveRemarkPopup: false,
  setShowMoveRemarkPopup: (value) =>
    set((state) => {
      return { showMoveRemarkPopup: value };
    }),

  showGroupViewRemarkPopup: false,
  setShowGroupViewRemarkPopup: (value) =>
    set((state) => {
      return { showGroupViewRemarkPopup: value };
    }),

  showAddNewRemarkPopup: false,
  setShowAddNewRemarkPopup: (value) =>
    set((state) => {
      return { showAddNewRemarkPopup: value };
    }),

  selectedRemarkType: "Functional",
  setSelectedRemarkType: (value) =>
    set((state) => {
      return { selectedRemarkType: value };
    }),

  selectedRemarks: [],
  setSelectedRemarks: (value) =>
    set((state) => {
      return { selectedRemarks: value };
    }),

  selectedCheckboxesRemark: [],

  setSelectedCheckboxesRemark: (value) =>
    set((state) => {
      return { selectedCheckboxesRemark: value };
    }),

  // Action to clear all selected checkboxes
  clearSelectedCheckboxesRemark: () =>
    set((state) => ({
      selectedCheckboxesRemark: [],
    })),

  remarkTypeTabsCount: {
    template: 0,
    custom: 0,
  },
  setRemarkTypeTabsCount: (value) =>
    set((state) => {
      return { remarkTypeTabsCount: value };
    }),

  remarkCatTabsCount: {
    functional: 0,
    issue: 0,
    limitation: 0,
    notInspected: 0,
    informational: 0,
  },
  setRemarkCatTabsCount: (value) =>
    set((state) => {
      return { remarkCatTabsCount: value };
    }),

  remarkList: [],
  setRemarkList: (value) =>
    set((state) => {
      return { remarkList: value };
    }),

  templateFrequency: "",
  setTemplateFrequency: (value) =>
    set((state) => {
      return { templateFrequency: value };
    }),

  reloadRemarksState: false,
  reloadRemarks: () =>
    set((state) => {
      return { reloadRemarksState: !state.reloadRemarksState };
    }),

  remarkImageToUpload: [],
  setRemarkImageToUpload: (value) =>
    set((state) => {
      return { remarkImageToUpload: value };
    }),

  remarkIdToUploadImage: null,
  setRemarkIdToUploadImage: (value) =>
    set((state) => {
      return { remarkIdToUploadImage: value };
    }),

  selectedRemarkImagesLengthStore: 0,
  setSelectedRemarkImagesLengthStore: (value) =>
    set((state) => {
      return { selectedRemarkImagesLengthStore: value };
    }),

  selectRemarkForDeselect: null,
  setSelectRemarkForDeselect: (value) =>
    set((state) => {
      return { selectRemarkForDeselect: value };
    }),
}));

export default useRemarkStore;
