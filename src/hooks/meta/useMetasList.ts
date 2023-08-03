import { fetchAllMetas, fetchMetaBySlug } from "@/service/MetaService";
import { useState } from "react";

const useMetaList = () => {
  const [metaList, setMetaList] = useState<any>();
  const [metaAll, setMetaAll] = useState<any>();

  const _fetch = (metaSlug: any) => {
    fetchMetaBySlug(metaSlug).then((res) => {
      setMetaList(res.data);
      console.log(res.data, "useMeta");
    });
  };

  const _fetchAll = () => {
    fetchAllMetas().then((res) => {
      setMetaAll(res.data);
    });
  };

  return {
    _fetch: _fetch,
    _fetchAll: _fetchAll,
    metaAll: metaAll,
    metaList: metaList,
  };
};

export default useMetaList;
