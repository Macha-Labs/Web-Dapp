import MCard from "@/_sdk/MCard";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import ExternalCard from "@/components/cards/ExternalCard";
import PostCard from "@/components/cards/PostCard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import useFetchByUser from "@/hooks/studio/useFetchByUser";
import useSearch from "@/hooks/studio/useSearch";
import useVectorSearch from "@/hooks/studio/useVectorSearch";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const hookVectorSearch = useVectorSearch();
  const hookFetchByUser = useFetchByUser();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (router.isReady) {
      // console.log(router.query.search)
      hookVectorSearch._fetch(String(router.query.search));
      hookFetchByUser._fetch(String(router.query.search));
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
      <>
        <FlexRow hrAlign="space-between" vrAlign="flex-start">
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start" width="60%">
            <Heading
              color={colorMode == "light" ? "#282828" : ""}
              fontSize={style.font.h3}
              marginBottom={style.margin.sm}
            >
              Search results
            </Heading>
            <Box
              // paddingTop={style.margin["lg"]}
              paddingTop={style.margin.navBoth}
              display={"flex"}
              width="100%"
              justifyContent={"center"}
            >
              <Grid gap="10px" width="100%">
                {hookFetchByUser.isLoading && (
                  <FlexRow height="200px" width="80vw">
                    <Loader size="lg" />
                  </FlexRow>
                )}
                {console.log(hookFetchByUser)}
                {!hookFetchByUser.isLoading &&
                  (hookFetchByUser.searchResults.length !== 0 ? (
                    hookFetchByUser.searchResults.map((item: any, index: any) => (
                      <FlexRow key={index} hrAlign="flex-start">
                        <UserProfileCard
                          key={index}
                          owner_address={item?.metaOwner}
                          description={
                            item?.meta?.data?.modified?.meta_description
                          }
                        />
                      </FlexRow>
                    ))
                  ) : (
                    <Box>
                      {/* <Text color={colorMode == "light" ? "#282828" : ""}>
                        No results found from hookFetchByUser
                      </Text> */}
                    </Box>
                  ))}
              </Grid>
            </Box>
            <Box
              // paddingTop={style.margin["lg"]}
              paddingTop={style.margin.navBoth}
              display={"flex"}
              width="100%"
              justifyContent={"center"}
            >
              <Grid gap="10px" width="100%">
                {hookVectorSearch.isLoading && (
                  <FlexRow height="200px" width="80vw">
                    <Loader size="lg" />
                  </FlexRow>
                )}
                {!hookVectorSearch.isLoading &&
                  (hookVectorSearch.searchResults.length !== 0 ? (
                    hookVectorSearch.searchResults.map((item: any, index: any) => (
                      <FlexRow key={index} hrAlign="flex-start">
                        <PostCard
                          // title={item?.meta?.data?.modified?.meta_title}
                          key={index}
                          image={item?.meta?.data?.modified?.meta_image}
                          slug={item?.meta_schema?.name}
                          description={
                            item?.meta?.data?.modified?.meta_description
                          }
                          title={item?.meta?.data?.ipfs?.contentURI?.name}
                          owner_name={item?.metaOwner}
                          onClick={() => {
                            router.push(`/search/meta/${item?._id}`);
                          }}
                          width="100%"
                        />
                      </FlexRow>
                    ))
                  ) : (
                    <Box>
                      <Text color={colorMode == "light" ? "#282828" : ""}>
                        No results found
                      </Text>
                    </Box>
                  ))}
              </Grid>
            </Box>
          </FlexColumn>
          <FlexColumn width="30%" hrAlign="space-between">
            <ExternalCard />
          </FlexColumn>
        </FlexRow>
      </>
    );
  };

  return (
    <FlexWindow
      view="col"
      // navLeft={renderNavLeft()}
      navTop={renderNavTop()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Search;
