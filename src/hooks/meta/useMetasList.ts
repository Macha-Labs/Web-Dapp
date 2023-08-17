import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";
import { useEffect, useState } from "react";

const useMetaList = () => {
  const [metaAll, setMetaAll] = useState<any>();
  const [metaSchemas, setMetaSchemas] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);

  const _fetchMore = (meta_schema?: any, limit?: number) => {
    console.log("pageNo", pageNo);
    if (pageNo == 1) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setShowMoreLoading(true);
    }
    fetchAllMetas(meta_schema, pageNo, limit ? limit : 30).then((res) => {
      console.log("allmetas", res);
      setMetaAll(metaAll ? [...metaAll, ...res?.data] : res?.data);
      setPageNo(pageNo + 1);
      setLastPage(res?.lastPage);
      setIsLoading(false);
      setShowMoreLoading(false);
    });
  };

  const _fetchMetaSchemas = () => {
    fetchMetaSchemas().then((res) => {
      setMetaSchemas(res.data);
      setIsLoading(false);
    });
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
  };
};

export default useMetaList;
