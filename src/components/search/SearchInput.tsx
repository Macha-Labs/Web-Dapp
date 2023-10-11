import InputSearch from "@/_ui/input/InputSearch";
import useSearch from "@/hooks/studio/useSearch";

const SearchInput = (searchWidth?: any) => {
  const hookSearch = useSearch();
  
  return (
    <InputSearch
      width={searchWidth ? searchWidth : "100%"}
      height="2.2rem"
      value={hookSearch.inputValue}
      ref={hookSearch.searchRef}
      onChange={hookSearch.handleInputChange} // Call handleInputChange when input changes
      onKeydown={hookSearch.handleRoute} // Call handleKeyDown on Enter key press
    />
  );
};

export default SearchInput;
