import { create } from "zustand";

const useLoaderStore = create((set) => ({
  loader: false,
  setLoader: (value) =>
    set((state) => {
      return { loader: value };
    }),
}));

export default useLoaderStore;
