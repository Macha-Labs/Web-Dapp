import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    load: (data: any) => set((state: any) => ({ user: data})),
    unload: () => set({ user: null }),
    followers: null,
    loadFollowers: (data: any) => set((state: any) => ({ followers: data})),
    unloadFollowers: () => set({ followers: null }),
    loadFollowing: (data: any) => set((state: any) => ({ following: data})),
    unloadFollowing: () => set({ following: null }),
})) 

export default useUserStore;