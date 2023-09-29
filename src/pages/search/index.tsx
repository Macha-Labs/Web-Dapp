import MCard from "@/_sdk/MCard";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import useSearch from "@/hooks/studio/useSearch";
import useVectorSearch from "@/hooks/studio/useVectorSearch";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const hookSearch = useVectorSearch();
  const {colorMode} = useColorMode()

  useEffect(() => {
    if (router.isReady) {
      // console.log(router.query.search)
      hookSearch._fetch(String(router.query.search));
    }
  }, [router.query.search]);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta search={true} />;
  };

  const renderBody = () => {
    return (
      <CardNative
        header={
          <>
            <Heading color={colorMode == "light" ? "#282828" : ""} fontSize={style.font.h3}>Search results</Heading>
          </>
        }
      >
        <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
          <Box
            // paddingTop={style.margin["lg"]}
            paddingTop={style.margin.navBoth}
            display={"flex"}
            width="100%"
            justifyContent={"center"}
          >
            <Grid templateColumns="repeat(3,1fr)" gap="10px" width="100%">
              {hookSearch.isLoading && (
                <FlexRow height="200px" width="80vw">
                  <Loader size="lg" />
                </FlexRow>
              )}
              {!hookSearch.isLoading &&
                (hookSearch.searchResults.length !== 0 ? (
                  hookSearch.searchResults.map((item: any, index: any) => (
                    <GridItem key={index} colSpan={1}>
                      <MCard
                        title={item?.meta?.data?.modified?.meta_title}
                        key={index}
                        image={item?.meta?.data?.modified?.meta_image}
                        slug={item?.meta_schema?.name}
                        description={item?.meta?.data?.modified?.meta_description}
                        onClick={() => {
                          router.push(`/search/meta/${item?._id}`);
                        }}
                      />
                    </GridItem>
                  ))
                ) : (
                  <Box>
                    <Text color={colorMode == "light" ? "#282828" : ""}>No results found</Text>
                  </Box>
                ))}
            </Grid>
          </Box>
        </FlexColumn>
      </CardNative>
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
