import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import CreatorCard from "@/components/cards/CreatorCard";
import NftCard from "@/components/cards/NftCard";
import SearchResultsTxn from "@/components/studio/SearchResultsTxn";
import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";
import React from "react";

const SearchResults = () => {
  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs}>
        <SearchResultsTxn/>
      </Box>
    );
  };

  return (
    <>
      <FlexWindow
        view="both"
        navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
};

export default SearchResults;
