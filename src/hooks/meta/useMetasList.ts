import { fetchMetaBySlug } from "@/service/MetaService";
import { useState } from "react";

const useMetaList = () => {
  const [metaList, setMetaList] = useState<any>();

  const _fetch = (metaSlug: any) => {
    fetchMetaBySlug(metaSlug).then((res) => {
      setMetaList(res.data);
      console.log(res.data, "useMeta");
    });
  };

  return {
    _fetch: _fetch,
    metaList: metaList,
  };
};

export default useMetaList;
