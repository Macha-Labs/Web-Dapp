import InputSearch from "@/_ui/input/InputSearch";
import useSearch from "@/hooks/studio/useSearch";
import useVectorSearch from "@/hooks/studio/useVectorSearch";
import { useRouter } from "next/router";
import React from "react";

const SearchInput = (searchWidth?: any) => {
  const hookSearch = useVectorSearch();
  const router = useRouter();
  return (
    <InputSearch
      width={searchWidth ? searchWidth : "100%"}
      height="2.2rem"
      defaultValue={hookSearch.searchString}
      value={hookSearch.searchString}
      onChange={(e: any) => hookSearch.setSearchString(e.target.value)}
      onKeydown={(e: any) => {
        if (e.key === "Enter") {
          e.preventDefault();
          router.push(`/search?search=${hookSearch.searchString}`);
        }
      }}
    />
  );
};

export default SearchInput;
