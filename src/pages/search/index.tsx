import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";

import { useEffect } from "react";

const Search = () => {

  useEffect(() => {
    
  }, []);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
        <Box
          // paddingTop={style.margin["lg"]}
          paddingTop={style.margin.navBoth}
          display={"flex"}
          justifyContent={"center"}
        >

        </Box>
      </FlexColumn>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={renderNavLeft()}
      navTop={renderNavTop()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Search;
