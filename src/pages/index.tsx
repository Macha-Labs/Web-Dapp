import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavSearch from "@/_ui/nav/NavSearch";
import SearchHeader from "@/components/search/SearchHeader";
import { style } from "@/styles/StyledConstants";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavSearch showLogo={true} />;
  };

  const renderBody = () => {
    return (
      <Box overflowX="hidden">
        <FlexColumn
          hrAlign="flex-start"
          vrAlign="flex-start"
          padding="0rem 0rem"
          height="130vh"
        >
          <Box
            border={colorMode ? "" : style.card.border.default}
            backgroundImage={
              colorMode == "light"
                ? "url(/assets/explore/searchbg_light.svg)"
                : "url(/assets/icons/searchbg.svg)"
            }
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height="100%" //90
            width={"100%"}
            // borderRadius={style.card.borderRadius.button}
            // marginTop={style.margin.md}
            // paddingTop={style.padding.xxl}
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            paddingTop={style.margin["4xl"]}
            justifyContent={"flex-start"}
          >
            {/* <Image
              // className=""
              src="/assets/MACHALogo.svg"
              alt="logo"
              width={212}
              height={78}
              // width={246}
              // marginBottom={style.margin.sm}
            /> */}
            <Image
              // className="headerLogo"
              marginTop="4.5rem"
              src={
                colorMode == "light"
                  ? "/assets/explore/search-home-title-light.svg"
                  : "/assets/title.png"
              }
              alt="logo"
              // width={255}
              // height={93}
              // width={246}
              marginBottom={style.margin.sm}
            />
            <SearchHeader />
          </Box>
        </FlexColumn>
      </Box>
    );
  };

  return (
    <FlexWindow
      view="col" //
      navLeft={renderNavLeft()}
      navTop={renderNavTop()}
      padding="0% 0%"
      bodyElem={renderBody()}
      noPaddingTop={true}
    ></FlexWindow>
  );
};

export default Search;
