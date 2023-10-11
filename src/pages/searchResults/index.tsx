import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import SearchResultsTxn from "@/components/studio/SearchResultsTxn";
import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";

const SearchResults = () => {
  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavHeader />;
  };

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs}>
        <SearchResultsTxn />
      </Box>
    );
  };

  return (
    <>
      <FlexWindow
        view="col"
        // navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
};

export default SearchResults;
