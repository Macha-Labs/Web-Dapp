import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    load: (data: any) => set((state: any) => ({ user: data})),
    unload: () => set({ user: null }),
})) 

export default useUserStore;