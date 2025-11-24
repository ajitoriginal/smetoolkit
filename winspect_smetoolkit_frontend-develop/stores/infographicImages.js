import { create } from "zustand";
import { APIurl } from "../utils/storage";
import { toast } from "react-toastify";

const useInfographicImagesStore = create((set, get) => ({
  // State
  allInfographics: [],
  infographicsLoader: false,
  infographicsError: null,
  selectedImages: [],

  // Common function to get authorization header
  getAuthHeaders: () => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
    };
  },

  // Setters
  setAllInfographics: (value) =>
    set(() => ({
      allInfographics: value,
    })),
  setSelectedImages: (value) =>
    set(() => ({
      selectedImages: value,
    })),
  setInfographicsLoader: (value) =>
    set(() => ({
      infographicsLoader: value,
    })),
  setInfographicsError: (value) =>
    set(() => ({
      infographicsError: value,
    })),

  // Actions
  fetchInfographicImages: async (templateId) => {
    const api = APIurl();

    try {
      set({ infographicsLoader: true, infographicsError: null });

      let res = await fetch(
        `${api}api/v1/template/image?templateId=${templateId}`,
        {
          method: "GET",
          headers: get().getAuthHeaders(),
        },
      );

      if (res.ok) {
        const json = await res.json();
        const infographics = json?.body ?? json;
        set({ allInfographics: infographics });
      } else {
        let message = res.statusText;
        try {
          const errJson = await res.json();
          message = errJson?.error?.message || message;
        } catch (_) {}
        set({ infographicsError: message });
      }
    } catch (err) {
      set({
        infographicsError: err?.message || "Error fetching template images",
      });
    } finally {
      set({ infographicsLoader: false });
    }
  },
  createInfographicImagePaths: async ({ templateId, images }) => {
    const api = APIurl();
    const res = await fetch(`${api}api/v1/template/images`, {
      method: "POST",
      headers: get().getAuthHeaders(),
      body: JSON.stringify({ templateId, images }),
    });
    try {
      return await res.json();
    } catch (_) {
      return null;
    }
  },
  deleteInfographicImages: async ({ templateId, images }) => {
    const api = APIurl();
    try {
      const res = await fetch(`${api}api/v1/template/images`, {
        method: "DELETE",
        headers: get().getAuthHeaders(),
        body: JSON.stringify({ templateImageIds: images }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
    
      return await res.json();
    } catch (error) {
      toast.error(error?.message)
      return null;
    }
  },
  getInfographicUploadUrls: async ({ templateId, images }) => {
    const api = APIurl();
    try {
      const res = await fetch(`${api}api/v1/template/images/upload-urls`, {
        method: "POST",
        headers: get().getAuthHeaders(),
        body: JSON.stringify({ templateId, images }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
    
      return await res.json();
    } catch (error) {
      toast.error(error?.message)
      return null;
    }
  },
}));

export default useInfographicImagesStore;
