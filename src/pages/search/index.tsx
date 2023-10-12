import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import Loader from "@/_ui/loader/Loader";
import NavFooter from "@/_ui/nav/NavFooter";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import ExternalCard from "@/components/cards/ExternalCard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import SearchCol from "@/components/search/SearchCol";
import SearchRow from "@/components/search/SearchRow";
import useSearch from "@/hooks/studio/useSearch";
import { style } from "@/styles/StyledConstants";
import { Box, Grid, Heading, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const hookSearch = useSearch();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (router.isReady) {
      hookSearch.handleSearch(router.query.id, router.query.search);
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
            {!hookSearch?.isLoading &&
            hookSearch?.searchResults?.identities?.length ? (
              <FlexColumn>
                <UserProfileCard
                  user={hookSearch?.searchResults?.user}
                  identities={hookSearch?.searchResults?.identities}
                />
              </FlexColumn>
            ) : (
              <></>
            )}
            <Box
              paddingTop={style.margin.navBoth}
              display={"flex"}
              width="100%"
              justifyContent={"center"}
            >
              <Grid gap="10px" width="100%">
                <>
                  {(router?.query?.id == "nft" ||
                    router?.query?.id == "music") && (
                    <SearchRow
                      isLoading={hookSearch?.isLoading}
                      router={router}
                      results={hookSearch?.searchResults?.metas}
                    />
                  )}
                  {router?.query?.id != "nft" &&
                    router?.query?.id != "music" && (
                      <SearchCol
                        isLoading={hookSearch?.isLoading}
                        results={hookSearch?.searchResults?.metas}
                        router={router}
                      />
                    )}
                </>
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
