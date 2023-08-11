import { fetchMetaBySlug, fetchMetaByUid } from "@/service/MetaService";
import { useState } from "react";

const useMeta = () => {
  const [metaData, setMetaData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = (metaSlug: any) => {
    fetchMetaByUid(metaSlug).then((res) => {
      setMetaData(res.data);
      setIsLoading(false)
      console.log(res.data, "useMeta");
    });
  };

  return {
    _fetch: _fetch,
    metaData: metaData,
    isLoading: isLoading
  };
};

export default useMeta;
