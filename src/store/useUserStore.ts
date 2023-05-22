import { User$ } from '@/schema/user';
import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: new User$(null, null, null),
    userMetas: [],
    loadUserMetas: (data: any) => set((state: any) => ({ userMetas: data})),

    load: (data: any) => set((state: any) => ({ user: data})),
    unload: () => set({ user: new User$(null, null, null) }),

    followers: null,
    loadFollowers: (data: any) => set((state: any) => ({ followers: data})),
    unloadFollowers: () => set({ followers: null }),
    following: null,
    loadFollowing: (data: any) => set((state: any) => ({ following: data})),
    unloadFollowing: () => set({ following: null }),
})) 

export default useUserStore;