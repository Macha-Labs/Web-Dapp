import useMetaStore from "@/store/useMetaStore";
import { Meta, Api } from "@metaworklabs/macha-dev-sdk/lib";

const useMeta = () => {
  const $loadMeta = useMetaStore((state: any) => state.loadMeta);
  const $loadMetaInfo = useMetaStore((state: any) => state.loadMetaInfo);

  const metaInit = async (data: any) => {
    if (data?.state?.status == "PENDING") {
      // const meta = new Meta(data._id);
      // console.log("meta", meta);
      console.log("Pending meta ", data);
      $loadMeta(data);
    } else {
      try {
        const meta = new Meta(data.id);
        console.log("meta", meta);
        $loadMeta(meta);
        const metaipfs: any = await meta.fetchMetaIpfs();
        console.log("metaipfs", metaipfs);
        $loadMetaInfo(metaipfs);
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const apiInit = async(data: any) => {
    try {
      const apiClass = new Api(data?.id);
      console.log("Api class ", apiClass);
      const apiIpfs: any = await apiClass.fetchApiIpfs();
      console.log("apiIpfs ", apiIpfs);
    } catch (error) {
      console.log("Error in initializing Api class");
    }
  }

  return { 
    metaInit: metaInit,
    apiInit: apiInit
  };
};

export default useMeta;
