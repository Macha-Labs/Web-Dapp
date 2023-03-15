import { create } from 'zustand'

const useChatMembersStore = create((set) => ({
    members: [],
    load: (data: any) => set((state: any) => ({ members: data})),
    unload: () => set({ members: null }),
})) 

export default useChatMembersStore;