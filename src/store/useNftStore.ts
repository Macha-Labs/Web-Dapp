import { create } from "zustand";

const useNftStore = create((set) => ({
  totalNfts: null,
  loadTotalNfts: (data: any) => set((state: any) => ({ totalNfts: data })),
}));
export default useNftStore;
