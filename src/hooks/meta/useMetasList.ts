import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";
import { useState } from "react";

const useMetaList = () => {
  const [metaList, setMetaList] = useState<any>();
  const [metaAll, setMetaAll] = useState<any>();
  const [metaSchemas, setMetaSchemas] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const _fetchAll = (meta_schema?: any) => {
    setIsLoading(true)
    fetchAllMetas(meta_schema).then((res) => {
      console.log(res.data,"all metas")
      setMetaAll(res.data);
      setIsLoading(false)
    });
  };

  const _fetchMetaSchemas = () => {
    fetchMetaSchemas().then((res) => {
      console.log(res.data,"meta schemas")
      setMetaSchemas(res.data);
      setIsLoading(false)
    });
  };

  return {
    _fetchAll: _fetchAll,
    _fetchMetaSchemas: _fetchMetaSchemas,
    metaAll: metaAll,
    metaList: metaList,
    metaSchemas: metaSchemas,
    isLoading: isLoading,
  };
};

export default useMetaList;
