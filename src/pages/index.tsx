import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import SearchHeader from "@/components/search/SearchHeader";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text } from "@chakra-ui/react";

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
        padding="1rem 0rem"
        height="100vh"
      >
        <Box
          border={style.card.border.default}
          backgroundImage="url(../assets/icons/searchbg.svg)"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          height="100%"
          width={"100%"}
          borderRadius={style.card.borderRadius.button}
          // marginTop={style.margin.md}
          // paddingTop={style.padding.xxl}
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
          paddingTop={style.margin["4xl"]}
          justifyContent={"flex-start"}
        >
          <Image
            // className=""
            src="/assets/MACHALogo.svg"
            alt="logo"
            width={212}
            height={78}
            // width={246}
            // marginBottom={style.margin.sm}
          />
          <Image
            // className="headerLogo"
            src="/assets/title.png"
            alt="logo"
            // width={255}
            // height={93}
            // width={246}
            marginBottom={style.margin.sm}
          />
          <SearchHeader />
        </Box>
      </FlexColumn>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={renderNavLeft()}
      // navTop={renderNavTop()}
      padding="0% 1%"
      bodyElem={renderBody()}
      noPaddingTop={true}
    ></FlexWindow>
  );
};

export default Search;
