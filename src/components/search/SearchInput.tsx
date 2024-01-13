import useSearch from "@/_sdk/hooks/useSearch";
import InputSearch from "@/_ui/input/InputSearch";

type Props = {
  searchWidth?: string;
};

const SearchInput = ({ searchWidth }: Props) => {
  const hookSearch = useSearch();

  return (
    <InputSearch
      width={searchWidth}
      height="2.2rem"
      value={hookSearch.inputValue}
      ref={hookSearch.searchRef}
      onChange={hookSearch.handleInputChange} // Call handleInputChange when input changes
      onKeydown={hookSearch.handleRoute} // Call handleKeyDown on Enter key press
    />
  );
};

export default SearchInput;
