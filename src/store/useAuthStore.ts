import { create } from "zustand";

const useAuthStore = create((set) => ({
  address: null,
  signer: null,
  provider: null,
  macha: {},
  isConnected: null,
  loadSigner: (data: any) => set((state: any) => ({ signer: data })),
  loadMacha: (data: any) => set((state: any) => ({ macha: data })),
  loadAddress: (data: any) => set((state: any) => ({ address: data })),
  loadProvider: (data: any) => set((state: any) => ({provider: data})),
  loadIsConnected: (data: any) => set((state: any) => ({isConnected: data})),

  unload: (data: any) =>
    set((state: any) => ({
      signer: null,
      provider: null,
      address: null,
      isConnected: null,
      macha: null,
    })),
}));

export default useAuthStore;