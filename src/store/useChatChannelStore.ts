import { create } from 'zustand'

const useChatChannelStore = create((set) => ({
    channel: null,
    loading: null,
    loadLoading: (data: any) => set((state: any) => ({ loading: data})),
    load: (data: any) => set((state: any) => ({ channel: data})),
    unload: () => set({ channel: null }),
})) 

export default useChatChannelStore;