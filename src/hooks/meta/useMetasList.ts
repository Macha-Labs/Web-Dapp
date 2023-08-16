import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";
import { useEffect, useState } from "react";

const useMetaList = () => {
  const [metaAll, setMetaAll] = useState<any>();
  const [metaSchemas, setMetaSchemas] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const _fetchAll = (meta_schema?: any, page_no?: number, limit?: number) => {
    setIsLoading(true);
    fetchAllMetas(meta_schema, page_no ? page_no : 1, limit ? limit : 30).then(
      (res) => {
        setMetaAll(res?.data);
        setLastPage(res?.lastPage);
        setIsLoading(false);
      }
    );
  };
  const _fetchMore = (meta_schema?: any, page_no?: number, limit?: number) => {
    setIsLoading(true);
    fetchAllMetas(meta_schema, page_no ? page_no : 1, limit ? limit : 30).then(
      (res) => {
        setMetaAll([...metaAll, ...res?.data]);
        setLastPage(res?.lastPage);
        setIsLoading(false);
      }
    );
  };

  const _fetchMetaSchemas = () => {
    fetchMetaSchemas().then((res) => {
      setMetaSchemas(res.data);
      setIsLoading(false);
    });
  };

  return {
    _fetchAll: _fetchAll,
    _fetchMetaSchemas: _fetchMetaSchemas,
    _fetchMore: _fetchMore,
    metaAll: metaAll,
    metaSchemas: metaSchemas,
    isLoading: isLoading,
    lastPage: lastPage,
  };
};

export default useMetaList;
