import { create } from "zustand";

const useCreatorFormStore = create((set) => ({
  creatorFormData: {
    link: "",
    description: "",
    chain_id: "",
    tags: "",
  },
  loadCreatorFormData: (data: any) =>
    set((state: any) => ({
      creatorFormData: { ...state.creatorFormData, ...data },
    })),
}));

export default useCreatorFormStore;
