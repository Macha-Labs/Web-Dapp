import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";
import { useState } from "react";

const useMetaList = () => {
  const [metaList, setMetaList] = useState<any>();
  const [metaAll, setMetaAll] = useState<any>();
  const [metaSchemas, setMetaSchemas] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursor, setCursor] = useState<any>();

  const _fetchAll = (meta_schema?: any,limit?: number) => {
    setIsLoading(true);
    fetchAllMetas(meta_schema,null,limit).then((res) => {
      console.log(res?.data, "all metas");
      setMetaAll(res?.data);
      setCursor(res?.cursor);
      setIsLoading(false);
    });
  };
  const _fetchMore = (meta_schema?: any, limit?: any) => {
    setIsLoading(true);
    fetchAllMetas(meta_schema, null, limit).then((res) => {
      console.log(res?.data, "more metas");
      setMetaAll(res?.data);
      setCursor(res?.cursor);
      setIsLoading(false);
    });
  };

  const _fetchMetaSchemas = () => {
    fetchMetaSchemas().then((res) => {
      console.log(res.data, "meta schemas");
      setMetaSchemas(res.data);
      setIsLoading(false);
    });
  };

  return {
    _fetchAll: _fetchAll,
    _fetchMetaSchemas: _fetchMetaSchemas,
    _fetchMore: _fetchMore,
    metaAll: metaAll,
    metaList: metaList,
    metaSchemas: metaSchemas,
    isLoading: isLoading,
  };
};

export default useMetaList;
