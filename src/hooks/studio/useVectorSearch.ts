import { vectorSearch } from "@/service/ApiService";
import { useState, useEffect } from "react";

const useVectorSearch = () => {
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const _fetch = async (searchTerm: string) => {
    setIsLoading(true);
    const res = await vectorSearch(searchTerm);
    if (res.data) {
      setSearchResults(res.data);
    } else {
      //console.log("search results not found");
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  return {
    _fetch: _fetch,
    searchResults: searchResults,
    isLoading: isLoading,
  };
};

export default useVectorSearch;
