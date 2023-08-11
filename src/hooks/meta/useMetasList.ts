import { fetchAllMetas, fetchMetaBySlug } from "@/service/MetaService";
import { useState } from "react";

const useMetaList = () => {
  const [metaList, setMetaList] = useState<any>();
  const [metaAll, setMetaAll] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetch = (metaSlug: any) => {
    fetchMetaBySlug(metaSlug).then((res) => {
      setMetaList(res.data);
      setIsLoading(false)
      console.log(res.data, "useMeta");
    });
  };

  const _fetchAll = () => {
    fetchAllMetas().then((res) => {
      console.log(res.data,"all metas")
      setMetaAll(res.data);
      setIsLoading(false)
    });
  };

  return {
    _fetch: _fetch,
    _fetchAll: _fetchAll,
    metaAll: metaAll,
    metaList: metaList,
    isLoading: isLoading
  };
};

export default useMetaList;
