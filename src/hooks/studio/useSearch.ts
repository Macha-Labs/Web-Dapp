import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useResolverSearch from "./useResolverSearch";
import useVectorSearch from "./useVectorSearch";
import { categorySearch, querySearch } from "@/service/ApiService";

const useSearch = () => {
  const hookVectorSearch = useVectorSearch();
  const hookResolverSearch = useResolverSearch();
  const [inputValue, setInputValue] = useState("");
  const regex = /@0x[0-9a-fA-F]{40}/g;
  const router = useRouter();
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const handleSearch = async (searchType: any, searchTerm: any) => {
    setIsLoading(true);

    let res;

    if (["social", "nft", "music"].includes(searchType)) {
      res = await categorySearch(searchType, searchTerm);
    } else {
      res = await querySearch(searchTerm);
    }
    if (res.data) {
      setSearchResults(res.data);
    } else {
      console.log("search results not found");
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  const handleFetch = (query: any) => {
    if (regex.test(query)) {
      // If it matches, use hookSearch1 and remove the first character
      setInputValue(query.slice(1));
    } else {
      setInputValue(query);
      hookVectorSearch._fetch(query);
    }
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
