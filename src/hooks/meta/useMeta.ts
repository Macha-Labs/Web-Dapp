import { fetchMetaBySlug, fetchMetaByUid } from "@/service/MetaService";
import { useState } from "react";

const useMeta = () => {
  const [metaData, setMetaData] = useState<any>();

  const _fetch = (metaSlug: any) => {
    fetchMetaByUid(metaSlug).then((res) => {
      setMetaData(res.data);
      console.log(res.data, "useMeta");
    });
  };

  return {
    _fetch: _fetch,
    metaData: metaData,
  };
};

export default useMeta;
