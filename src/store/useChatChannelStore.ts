import { create } from 'zustand'

const useChatChannelStore = create((set) => ({
    channel: null,
    loading: null,
    load: (data: any) => set((state: any) => ({ channel: data})),
    unload: () => set({ channel: null }),
    loadLoading: (data: any) => set((state: any) => ({ loading: data})),
})) 

export default useChatChannelStore;