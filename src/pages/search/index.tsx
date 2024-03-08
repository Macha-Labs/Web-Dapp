import useSearch from "@/_sdk/hooks/useSearch";
import MCarousal from "@/_ui/carousal/MCarousal";
import FlexColumn from "@/_ui/flex/FlexColumn";
import EmptyCard from "@/components/cards/EmptyCard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import SearchCol from "@/components/search/SearchCol";
import SearchRow from "@/components/search/SearchRow";
import { style } from "@/styles/StyledConstants";
import { Avatar, Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import SearchHeader from "@/components/search/SearchHeader";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import { dataPlugins } from "@/data/dataPlugins";
import { SearchPrompt } from "@/components/search/SearchPrompts";

const Search = () => {
  const router = useRouter();
  const hookSearch = useSearch();
  const { colorMode } = useColorMode();

  return (
    <Box height="80%">
        <FlexRow width="100%" hrAlign="start" height="content" marginBottom={'lg'}>
          <IconBase
              variant="solid"
              slug="icon-chevron"
              style={{ marginRight: "xs" }}
              size="xl"
              onClick={() => {
                router.push("/");
              }}
            />
        
        {/* Todo fix these underlined errors */}
        <TagNative
          icon={{
            align: "left",
            slug: `${router.query.plugin ? dataPlugins[router.query.plugin]?.image : ""}`,
          }}
          value={dataPlugins[router.query.plugin]?.heading}
          size="md"
          lineHeight="1.5rem"
        />
        </FlexRow>
        {hookSearch?.inputValue && <FlexRow width="100%" hrAlign="start" height="fit-content" marginBottom={"lg"}>
          <Avatar size="sm" marginRight={style.margin.sm}/>
          <Heading size="md">{hookSearch?.inputValue}</Heading>
        </FlexRow>}
        <FlexColumn hrAlign="space-between" vrAlign="flex-start" height="50%">
          {!hookSearch?.isLoading && (!hookSearch?.searchResults || !hookSearch?.searchResults?.length) && <SearchPrompt />}
          {hookSearch?.searchResults?.length > 0 && 
          <FlexColumn
          hrAlign="flex-start"
          vrAlign="flex-start"
          width="100%"
          marginBottom="sm"
        >
          <Text
            color={colorMode == "light" ? "#282828" : ""}
            fontSize={style.font.h6}
            marginBottom={style.margin.sm}
          >
            Here are search results across {dataPlugins[router.query.plugin]?.heading}
          </Text>

          {!hookSearch?.isLoading &&
          hookSearch?.searchResults?.account?.owner ? (
            <FlexColumn marginBottom="lg">
              <UserProfileCard
                account={hookSearch?.searchResults?.account}
                identities={hookSearch?.searchResults?.identities}
              />
            </FlexColumn>
          ) : (
            <></>
          )}
          {hookSearch?.searchResults?.nfts?.length > 0 && (
            <MCarousal
              results={hookSearch?.searchResults?.nfts}
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
              )}
              {router?.query?.id != "nft" && router?.query?.id != "music" && (
                <FlexColumn>
                  <Box marginTop={style.margin.sm} width="100%">
                    <SearchCol
                      next={() => {
                        hookSearch?.handleNext({
                          searchQuery: router?.query?.search,
                          category: router?.query?.id,
                        });
                      }}
                      isLoading={hookSearch?.isLoading}
                      results={hookSearch?.searchResults}
                      router={router}
                      plugin={dataPlugins[router?.query?.plugin]}
                    />
                  </Box>
                </FlexColumn>
              )}
            </>
          </Box>
          {!hookSearch?.isLoading &&
            hookSearch?.searchResults?.nfts?.length! > 0 &&
            hookSearch?.searchResults?.metas?.length! > 0 && <EmptyCard />}
        </FlexColumn>}
        </FlexColumn>

        <Box position={"fixed"} bottom={"5%"} width={"60%"}>
          <SearchHeader hookSearch={hookSearch} />
        </Box>
    </Box>
  );
};

export default Search;
