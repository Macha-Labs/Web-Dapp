import { create } from "zustand";

const useContractStore = create((set) => ({
  transactionDetails: {},
  loadTransactionDetails: (data: any) => set((state: any) => ({ transactionDetails: data })),
  contractDetails: {},
  loadContractDetails: (data: any) => set((state: any) => ({ contractDetails: data })),
  allContractDetails: {},
  loadAllContractDetails: (data: any) => set((state: any) => ({ allContractDetails: data })),
}));

export default useContractStore;
