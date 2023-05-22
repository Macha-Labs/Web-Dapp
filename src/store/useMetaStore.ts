import { create } from "zustand";

const useMetaStore = create((set) => ({
  formData: {},
  setFormData: (data: any) => set(() => ({ formData: { ...data } })),
}));

export default useMetaStore;
