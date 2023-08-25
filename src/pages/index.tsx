import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";

import { useEffect } from "react";

const Search = () => {
  useEffect(() => {}, []);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <FlexColumn
        hrAlign="flex-start"
        vrAlign="flex-start"
        padding="1.5rem 0rem"
        height="100vh"
      >
        <Box
          border={style.card.border.meta}
          backgroundImage="url(../assets/icons/searchbg.svg)"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          height="100%"
          width={"100%"}
          borderRadius={style.card.borderRadius.button}
          // marginTop={style.margin.md}
          // paddingTop={style.margin.navBoth}
          display={"flex"}
          justifyContent={"center"}
        >
          {/* <Text>macha</Text> */}
        </Box>
      </FlexColumn>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={renderNavLeft()}
      // navTop={renderNavTop()}
      bodyElem={renderBody()}
      noPaddingTop={true}
    ></FlexWindow>
  );
};

export default Search;
