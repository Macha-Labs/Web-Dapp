import useEmbeddSearch from "@/_sdk/hooks/useEmbeddSearch";
import useSearch from "@/_sdk/hooks/useSearch";
import MCarousal from "@/_ui/carousal/MCarousal";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavFooter from "@/_ui/nav/NavFooter";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import EmptyCard from "@/components/cards/EmptyCard";
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
  const hookEmbeddSearch = useEmbeddSearch()
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (router.isReady && router.query.id) {
      hookEmbeddSearch.handleEmbeddSearch(router.query.id.toString());
    } else if (
      router?.isReady &&
      !router?.query?.id &&
      !router?.query?.search
    ) {
      hookEmbeddSearch.handleEmbeddSearch("What is the latest in web3");
    }
  }, [router.query.id]);

  useEffect(() => {
    if (router.isReady && router.query.search) {
      hookEmbeddSearch.handleEmbeddSearch(router.query.search.toString());
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

            {!hookEmbeddSearch?.isLoading &&
            hookEmbeddSearch?.searchResults?.account?.owner ? (
              <FlexColumn marginBottom="lg">
                <UserProfileCard
                  account={hookEmbeddSearch?.searchResults?.account}
                  identities={hookEmbeddSearch?.searchResults?.identities}
                />
              </FlexColumn>
            ) : (
              <></>
            )}
            {hookEmbeddSearch?.searchResults?.nfts?.length > 0 && (
              <MCarousal
                results={hookEmbeddSearch?.searchResults?.nfts}
                marginLeft="-3.5rem"
              />
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
                  <SearchRow
                    next={() => {}}
                    isLoading={hookEmbeddSearch?.isLoading}
                    router={router}
                    results={hookEmbeddSearch?.searchResults?.metas}
                  />
                )}
                {router?.query?.id != "nft" && router?.query?.id != "music" && (
                  <FlexColumn>
                    <Box marginTop={style.margin.sm} width="100%">
                      <SearchCol
                        next={() => {}}
                        isLoading={hookEmbeddSearch?.isLoading}
                        results={hookEmbeddSearch?.searchResults?.metas}
                        router={router}
                      />
                    </Box>
                  </FlexColumn>
                )}
              </>
            </Box>
            {!hookEmbeddSearch?.isLoading &&
              hookEmbeddSearch?.searchResults?.nfts?.length! > 0 &&
              hookEmbeddSearch?.searchResults?.metas?.length! > 0 && <EmptyCard />}
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
