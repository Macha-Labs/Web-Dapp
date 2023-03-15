import { create } from 'zustand'

const useChatMessagesStore = create((set) => ({
    messages: [],
    load: (data: any) => set((state: any) => ({ messages: data})),
    unload: () => set({ messages: null }),
})) 

export default useChatMessagesStore;