import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useResolverSearch from "./useResolverSearch";
import useVectorSearch from "./useVectorSearch";
import { queryResolver } from "@/service/ApiService";
import { metaResolver } from "@/service/MetaService";

const useSearch = () => {
  const hookVectorSearch = useVectorSearch();
  const hookResolverSearch = useResolverSearch();
  const [inputValue, setInputValue] = useState("");
  const regex = /@0x[0-9a-fA-F]{40}/g;
  const router = useRouter();
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);
  const [page, setPage] = useState<any>(1);
  const handleSearch = async (searchQuery: any, category: any) => {
    setIsLoading(true);

    let res = await queryResolver({
      searchQuery: searchQuery,
      category: category,
    });

    if (res.data) {
      setSearchResults(res.data);
    } else {
      console.log("search results not found");
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  const handleFetch = async (category: any) => {
    setIsLoading(true);
    let limit = 30;
    await metaResolver({
      category: category,
      page: page,
      limit: limit ? limit : 30,
    }).then((res) => {
      console.log("search results value", searchResults);
      setSearchResults({metas:res?.data});
      setIsLoading(false);
    });

  };

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;

    // Check if the input value matches the regex pattern
    if (regex.test(newValue)) {
      // If it matches, use hookSearch1 and remove the first character

      setInputValue(newValue.substring(1));
    } else {
      // If it doesn't match, use hookSearch

      setInputValue(newValue);
    }
  };

  const handleRoute = (e: any) => {
    console.log(router, "router value");
    if (e.key === "Enter") {
      e.preventDefault();
      const newValue = e.target.value;
      const searchValue = regex.test(inputValue)
        ? newValue.substring(1)
        : newValue;
      let url = `/search/?search=${searchValue}`;
      if (router?.query?.id) {
        url = `/search/?id=${router?.query?.id}&search=${searchValue}`;
      }
      router.push(url);
    }
  };

  return {
    handleInputChange,
    handleRoute: handleRoute,
    handleFetch,
    handleSearch: handleSearch,
    isLoading: isLoading,
    inputValue: inputValue,
    searchRef: searchRef,
    searchResults: searchResults,
    hookVectorSearch,
    hookResolverSearch,
  };
};

export default useSearch;
