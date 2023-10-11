import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavFooter from "@/_ui/nav/NavFooter";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import ExternalCard from "@/components/cards/ExternalCard";
import PostCard from "@/components/cards/PostCard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import useSearch from "@/hooks/studio/useSearch";
import { style } from "@/styles/StyledConstants";
import { Box, Grid, Heading, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const hookSearch = useSearch();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (router.isReady) {
      hookSearch.handleSearch(router.query.search);
    }
  }, [router.query.search]);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavHeader search={true} />;
  };

  const renderNavBottom = () => {
    return <NavFooter />;
  };

  const renderBody = () => {
    return (
      <>
        <FlexColumn hrAlign="space-between" vrAlign="flex-start">
          <FlexColumn
            hrAlign="flex-start"
            vrAlign="flex-start"
            width="100%"
            marginBottom="sm"
          >
            <Heading
              color={colorMode == "light" ? "#282828" : ""}
              fontSize={style.font.h3}
              marginBottom={style.margin.sm}
            >
              Search results
            </Heading>
            {hookSearch?.searchResults?.identities?.length && (
              <FlexColumn>
                <UserProfileCard
                  user={hookSearch?.searchResults?.user}
                  identities={hookSearch?.searchResults?.identities}
                />
              </FlexColumn>
            )}
            <Box
              paddingTop={style.margin.navBoth}
              display={"flex"}
              width="100%"
              justifyContent={"center"}
            >
              <Grid gap="10px" width="100%">
                {hookSearch.isLoading && (
                  <FlexRow height="200px" width="80vw">
                    <Loader size="lg" />
                  </FlexRow>
                )}
                {!hookSearch.isLoading &&
                  (hookSearch.searchResults.metas.length !== 0 ? (
                    hookSearch.searchResults.metas.map(
                      (item: any, index: any) => (
                        <FlexRow key={index} hrAlign="flex-start" marginBottom="xs">
                          <PostCard
                            // title={item?.meta?.data?.modified?.meta_title}
                            key={index}
                            image={
                              item?.meta?.data?.modified?.meta_image ||
                              item?.meta?.data?.modified?.meta_media
                            }
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
                      )
                    )
                  ) : (
                    <></>
                  ))}
              </Grid>
            </Box>
          </FlexColumn>

          <ExternalCard />
        </FlexColumn>
      </>
    );
  };

  return (
    <FlexWindow
      padding="0% 15%"
      view="col"
      // navLeft={renderNavLeft()}
      navTop={renderNavTop()}
      bodyElem={renderBody()}
      navBottom={renderNavBottom()}
    ></FlexWindow>
  );
};

export default Search;
