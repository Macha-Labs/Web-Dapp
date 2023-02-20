import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
const SearchBox = () => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    
    // handleSearch();  
  };

  const handleSearch = () => {
    // onSearch(query);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleQueryChange}
      />
      
    </InputGroup>
  );
};

export default SearchBox;