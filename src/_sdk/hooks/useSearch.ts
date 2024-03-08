import { client as lensClient } from "@/helpers/lens/client";
import { useSearchLens } from "@/_external/lens";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { metaResolver } from "../api";
import { MetaSearchInterface, SearchInterface } from "../interfaces";

const useSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const regex = /@0x[0-9a-fA-F]{40}/g;
  const router = useRouter();
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const hookSearchLens = useSearchLens();
  let [page, setPage] = useState<any>();


  useEffect(() => {
    setPage(0);
  }, []);

  const handleQuery = async (params: SearchInterface) => {
    const { searchQuery, category, slug, owner, limit, next } = params;
    setIsLoading(true);
    let query: any = {
      searchQuery: searchQuery,
      category: category,
      slug: slug,
      owner: owner,
      limit: limit ? limit : 10,
    };
    if (next) {
      query = { ...query, page: page + 1 };
    }

    // let res = await queryResolver(query);
    let res = await lensClient.search.publications({query: searchQuery});
    console.log("The result from lens SDK ", res);
    if (res) {
      setSearchResults(res.items);
    }
    setIsLoading(false);
  };

  const handleFetch = async (params: MetaSearchInterface) => {
    const { category, slug, owner, limit, next } = params;
    setIsLoading(true);

    let query: any = {
      category: category,
      slug: slug,
      owner: owner,
      limit: 10,
    };
    if (next) {
      query = { ...query, page: page + 1 };
    }
    await metaResolver(query).then((res) => {
      //console.log("check search results -> fetch", searchResults);

      let newResults =
        next && searchResults
          ? {
              ...searchResults,
              metas: searchResults?.metas
                ? [...searchResults.metas, ...res?.data]
                : res?.data,
            }
          : { metas: res?.data };
      setSearchResults(newResults);
      if (next) {
        setPage(page + 1);
      } else {
        setPage(1);
      }
      setIsLoading(false);
    });
  };

  const handleLoad = (params: any) => {
    const { searchQuery, category, slug, owner, next } = params;

    if (searchQuery) {
      handleQuery({
        searchQuery: searchQuery,
        category: category,
        slug: slug,
        owner: owner,
        next: next,
      });
    } else {
      handleFetch({
        category: category,
        slug: slug,
        owner: owner,
        next: next,
      });
    }
  };

  const handleSearch = async () => {
    if (router.query.plugin == 'lens') {
      const result = await hookSearchLens.lensPublications(inputValue);
      setSearchResults(result.items);
    } else if (router.query.plugin == 'lens-profile') {
      const result = await hookSearchLens.lensProfiles(inputValue);
      setSearchResults(result.items);
    }
  };

  const handleNext = (params: any) => {
    handleLoad({ ...params, next: true });
  };

  const handleClear = () => {
    setPage(1);
    //console.log("check search results -> clear", searchResults);
    setSearchResults(null);
  };

  const handleRoute = (e: any) => {
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
  };

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleKeyEnter = (e:any) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      handleSearch();
    }
  }


  return {
    handleInputChange,
    handleRoute: handleRoute,
    handleSearch: handleSearch,
    handleNext: handleNext,
    handleKeyEnter: handleKeyEnter,
    isLoading: isLoading,
    inputValue: inputValue,
    searchRef: searchRef,
    searchResults: searchResults,
  };
};

export default useSearch;
