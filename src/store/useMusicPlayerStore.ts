import { create } from "zustand";

const useMusicPlayerStore = create((set) => ({
  isPlaying: {},
  loadIsPlaying: (data: any) => set((state: any) => ({ isPlaying: data })),
  currentAudio: {},
  loadCurrentAudio: (data: any) =>
    set((state: any) => ({ currentAudio: data })),
  play: {},
  loadPlay: (data: any) => set((state: any) => ({ play: data })),
  pause: {},
  loadPause: (data: any) => set((state: any) => ({ pause: data })),
}));

export default useMusicPlayerStore;
