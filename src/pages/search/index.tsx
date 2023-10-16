import useSearch from "@/_sdk/hooks/useSearch";
import NftCarousal from "@/_ui/carousal/NftCarousal";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavFooter from "@/_ui/nav/NavFooter";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import ExternalCard from "@/components/cards/ExternalCard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import SearchCol from "@/components/search/SearchCol";
import SearchRow from "@/components/search/SearchRow";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const hookSearch = useSearch();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (router.isReady && router.query.id) {
      hookSearch.handleSearch({ category: router.query.id });
    } else if (
      router?.isReady &&
      !router?.query?.id &&
      !router?.query?.search
    ) {
      hookSearch.handleSearch({ searchQuery: "What is the latest in web3" });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (router.isReady && router.query.search) {
      hookSearch.handleSearch({
        searchQuery: router.query.search,
        category: router.query.id,
      });
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
              <FlexColumn marginBottom="md">
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
              <>
                {(router?.query?.id == "nft" ||
                  router?.query?.id == "music") && (
                  <FlexColumn>
                    <NftCarousal
                      next={() => {
                        hookSearch?.handleNext({
                          searchQuery: router?.query?.search,
                          category: router?.query?.id,
                        });
                      }}
                      isLoading={hookSearch?.isLoading}
                      results={hookSearch?.searchResults?.metas}
                    />
                    <SearchRow
                      next={() => {
                        hookSearch?.handleNext({
                          searchQuery: router?.query?.search,
                          category: router?.query?.id,
                        });
                      }}
                      isLoading={hookSearch?.isLoading}
                      router={router}
                      results={hookSearch?.searchResults?.metas}
                    />
                  </FlexColumn>
                )}
                {router?.query?.id != "nft" && router?.query?.id != "music" && (
                  <FlexColumn>
                    <NftCarousal
                      next={() => {
                        hookSearch?.handleNext({
                          searchQuery: router?.query?.search,
                          category: router?.query?.id,
                        });
                      }}
                      isLoading={hookSearch?.isLoading}
                      results={hookSearch?.searchResults?.nfts}
                    />
                    <SearchCol
                      next={() => {
                        hookSearch?.handleNext({
                          searchQuery: router?.query?.search,
                          category: router?.query?.id,
                        });
                      }}
                      isLoading={hookSearch?.isLoading}
                      results={hookSearch?.searchResults?.metas}
                      router={router}
                    />
                  </FlexColumn>
                )}
              </>
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
