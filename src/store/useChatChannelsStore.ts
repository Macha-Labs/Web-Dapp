import { create } from 'zustand'

const useChatChannelsStore = create((set) => ({
    channels: null,
    channelsStream: null,
    channelsXmtp: null,
    load: (data: any) => set((state: any) => ({ channels: data})),
    unload: () => set({ channels: null }),
})) 

export default useChatChannelsStore;