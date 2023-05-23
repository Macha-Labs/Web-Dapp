import { create } from "zustand";

const useMetaStore = create((set) => ({
  formData: {},
  setFormData: (data: any) => set(() => ({ formData: { ...data } })),
  metaInfo: {},
  loadMetaInfo: (data: any) => set((state: any) => ({ metaInfo: data })),
}));

export default useMetaStore;
