import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { IconSVG } from "@/_ui/icons/IconSVG";
import GlobalIcons from "@/styles/GlobalIcons";
const ChatSearch = (props: any) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);

    // handleSearch();
  };

  const handleSearch = () => {
    props?.onSearch(query);
  };

  return (
    <InputGroup className={props.style?.className}>
      <InputLeftElement pointerEvents="none">
        <IconSVG path="icon-search" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search Studio"
        value={query}
        onChange={handleQueryChange}
        // borderImage="linear-gradient(to right, #ff8a00, #e52e71) 1"
      />
    </InputGroup>
  );
};

export default ChatSearch;
