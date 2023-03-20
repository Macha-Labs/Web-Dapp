import { create } from 'zustand'

export const useChatMembersStore = create((set) => ({
    members: null,
    load: (data: any) => set((state: any) => ({ members: data})),
    unload: () => set({ members: null }),

    memberAll: null,
    loadAll: (data: any) => set((state: any) => ({ memberAll: data})),
    unloadAll: () => set({ membersAll: null }),

    memberIds: null,
    loadIds: (data: any) => set((state: any) => ({ memberIds: data})),
    unloadIds: () => set({ memberIds: null }),
    
}))