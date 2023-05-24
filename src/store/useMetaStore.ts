import { create } from "zustand";

const useMetaStore = create((set) => ({
  meta: {},
  loadMeta: (data: any) => set((state: any) => ({ meta: data })),
  overviewData: {},
  loadOverviewData: (data: any) =>
    set((state: any) => ({ overviewData: data })),
  triggerData: {},
  loadTriggerData: (data: any) => set((state: any) => ({ triggerData: data })),
  originData: [{}],
  loadOriginData: (data: any) => set((state: any) => ({ originData: data })),
  metaInfo: {},
  loadMetaInfo: (data: any) => set((state: any) => ({ metaInfo: data })),
}));

export default useMetaStore;
