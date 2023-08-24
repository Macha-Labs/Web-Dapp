import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";
import { useEffect, useState } from "react";

const useMetaList = () => {
  const [metaAll, setMetaAll] = useState<any>();
  const [metaSchemas, setMetaSchemas] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);

  const _fetchMore = async (meta_schema?: any, limit?: number) => {
    console.log("pageNo", pageNo);
    if (pageNo == 1) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setShowMoreLoading(true);
    }
    await fetchAllMetas(meta_schema, pageNo, limit ? limit : 30).then((res) => {
      console.log("allmetas", res);
      setMetaAll(metaAll ? [...metaAll, ...res?.data] : res?.data);
      setPageNo(pageNo + 1);
      setLastPage(res?.lastPage);
      setIsLoading(false);
      setShowMoreLoading(false);
    });
  };

  const initialLoadAllMetas = (all_metas: any, last_page: any) => {
    setMetaAll(all_metas);
    setPageNo(pageNo + 1);
    setLastPage(last_page);
    setIsLoading(false);
    setShowMoreLoading(false);
  }

  const _fetchMetaSchemas = async () => {
    await fetchMetaSchemas().then((res: any) => {
      setMetaSchemas(res.data);
      setIsLoading(false);
    });
  };

  const initialLoadMetaSchemas = async (meta_schemas: any) => {
      setMetaSchemas(meta_schemas);
      setIsLoading(false);
  };

  return {
    _fetchMetaSchemas: _fetchMetaSchemas,
    _fetchMore: _fetchMore,
    metaAll: metaAll,
    metaSchemas: metaSchemas,
    isLoading: isLoading,
    lastPage: lastPage,
    pageNo: pageNo,
    setPageNo: setPageNo,
    showMoreLoading: showMoreLoading,
    initialLoadAllMetas: initialLoadAllMetas,
    initialLoadMetaSchemas: initialLoadMetaSchemas
  };
};

export default useMetaList;
