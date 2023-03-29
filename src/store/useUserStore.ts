import { User$ } from '@/schema/user';
import { create } from 'zustand'

const useUserStore = create((set) => ({
    address: null,
    loadAddress: (data: any) => set((state: any) => ({ address: data})),
    user: new User$(null, null, null),
    load: (data: any) => set((state: any) => ({ user: data})),
    unload: () => set({ user: new User$(null, null, null) }),
    followers: null,
    loadFollowers: (data: any) => set((state: any) => ({ followers: data})),
    unloadFollowers: () => set({ followers: null }),
    following: null,
    loadFollowing: (data: any) => set((state: any) => ({ following: data})),
    unloadFollowing: () => set({ following: null }),
    connected: null,
    loadConnected: (data: any) => set((state: any) => ({ connected: data})),
})) 

export default useUserStore;