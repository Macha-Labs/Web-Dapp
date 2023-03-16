import { create } from 'zustand'

const useChatChannelStore = create((set) => ({
    channel: null,
    load: (data: any) => set((state: any) => ({ channel: data})),
    unload: () => set({ channel: null }),
})) 

export default useChatChannelStore;