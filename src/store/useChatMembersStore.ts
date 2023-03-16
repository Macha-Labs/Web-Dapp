import { create } from 'zustand'

export const useChatMembersStore = create((set) => ({
    members: null,
    load: (data: any) => set((state: any) => ({ members: data})),
    unload: () => set({ members: null }),

    memberIds: null,
    loadIds: (data: any) => set((state: any) => ({ memberIds: data})),
    unloadIds: () => set({ memberIds: null }),
    
}))