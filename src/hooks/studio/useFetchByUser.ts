import { fetchByUser } from "@/service/ApiService";
import { useState, useEffect } from "react";

const useFetchByUser = () => {
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchString, setSearchString] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const _fetch = async (address: string) => {
    setIsLoading(true);
    const res = await fetchByUser(address);
    if (res.data) {
      setSearchResults(res.data);
    } else {
      console.log("search results not found");
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  return {
    _fetch: _fetch,
    searchResults: searchResults,
    searchString: searchString,
    setSearchString: setSearchString,
    isLoading: isLoading,
  };
};

export default useFetchByUser;
