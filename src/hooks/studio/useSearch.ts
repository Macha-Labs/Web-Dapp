import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useResolverSearch from "./useResolverSearch";
import useVectorSearch from "./useVectorSearch";
import { querySearch } from "@/service/ApiService";

const useSearch = () => {
  const hookVectorSearch = useVectorSearch();
  const hookResolverSearch = useResolverSearch();
  const [inputValue, setInputValue] = useState("");
  const regex = /@0x[0-9a-fA-F]{40}/g;
  const router = useRouter();
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(true);

  const handleSearch = async (searchTerm: any) => {
    setIsLoading(true);
    const res = await querySearch(searchTerm);
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
    if (e.key === "Enter") {
      e.preventDefault();
      const newValue = e.target.value;
      const searchValue = regex.test(inputValue)
        ? newValue.substring(1)
        : newValue;
      router.push(`/search?search=${searchValue}`);
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
