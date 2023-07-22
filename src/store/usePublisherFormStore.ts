import { create } from "zustand";

const usePublisherFormStore = create((set) => ({

    publisherFormData: {
        name: "",
        address: "",
        email: "",
        logo: "",
        website: ""
    },
    loadPublisherFormData: (data: any) => set((state: any) => ({ publisherFormData: { ...state.publisherFormData, ...data } }))
}));

export default usePublisherFormStore;
