import React, { useEffect, useState } from "react";
import { Meta } from "@metaworklabs/macha-dev-sdk/lib";
import useMetaStore from "@/store/useMetaStore";

type Props = {
  id: string;
};
const useMeta = ({ id = "8n" }: any) => {

  const $loadMeta = useMetaStore((state: any) => state.loadMeta);
  const $loadMetaInfo = useMetaStore((state: any) => state.loadMetaInfo);

  const metaInit = async () => {
    const meta = new Meta(id);
    console.log("meta", meta);
    $loadMeta(meta);
    const metaipfs: any = await meta.fetchMetaIpfs();
    console.log("metaipfs", metaipfs);
    $loadMetaInfo(metaipfs);
  };

  useEffect(() => {
    console.log("metaid", id);
    if (id) {
      metaInit();
    }
  }, [id]);
  return { };
};

export default useMeta;
