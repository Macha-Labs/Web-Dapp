import { create } from "zustand";

const useContractFormStore = create((set) => ({
  contractFormData: {
    name: "",
    description: "",    
    address: "",
    chain_id: "",
    slug: "",
    interested_methods: "",
    interested_events: "",
    read_abi_from: "",
    image: "",
  },
  loadContractFormData: (data: any) => set((state: any) => ({contractFormData: {...state.contractFormData,...data}}))
}));

export default useContractFormStore;
