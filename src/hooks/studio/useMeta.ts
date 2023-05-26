import useMetaStore from "@/store/useMetaStore";
import { Meta } from "@metaworklabs/macha-dev-sdk/lib";

const useMeta = () => {
  const $loadMeta = useMetaStore((state: any) => state.loadMeta);
  const $loadMetaInfo = useMetaStore((state: any) => state.loadMetaInfo);

  const metaInit = async (data: any) => {
    if (data?.state?.status == "PENDING") {
      // const meta = new Meta(data._id);
      // console.log("meta", meta);
      $loadMeta(data);
    } else {
      const meta = new Meta(data.id);
      console.log("meta", meta);
      $loadMeta(meta);
      const metaipfs: any = await meta.fetchMetaIpfs();
      console.log("metaipfs", metaipfs);
      $loadMetaInfo(metaipfs);
    }
  };

  return { metaInit: metaInit };
};

export default useMeta;
