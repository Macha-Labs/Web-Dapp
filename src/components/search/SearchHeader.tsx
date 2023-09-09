import FlexColumn from "@/_ui/flex/FlexColumn";
import IconBase from "@/_ui/icons/IconsBase";
import useSearch from "@/hooks/studio/useSearch";
import { style } from "@/styles/StyledConstants";
import { Box, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import SearchRow from "./SearchRow";

type Props = {
  options?: any;
};

const SearchHeader = ({ options }: Props) => {
  const hookSearch = useSearch();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchRef = useRef(null);
  const router = useRouter();

  return (
    <>
      <FlexColumn width="50%" height="fit-content">
        <InputGroup
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setShowSuggestions(false);
          }}
          flexDirection="column"
          size="md"
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <input
              value={hookSearch.searchString}
              type="text"
              ref={searchRef}
              className="searchHeader"
              onChange={(e: any) => hookSearch.setSearchString(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  router.push(`/search?search=${hookSearch.searchString}`);
                }
              }}
              placeholder="Try Spectacular Search Now"
              style={{
                height: "5rem",
                borderRadius: `${style.card.borderRadius.default}`,
                fontSize: `${style.font.h4}`,
                paddingRight: `${style.padding.xl}`,
                paddingLeft: `${style.padding.xl}`,
                background: `${style.input.bg.default}`,
                border: `${style.input.border.default}`,
                width: "100%",
              }}
            />
            <InputRightElement alignItems="start">
              <Box
                style={{
                  height: "5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: `${style.margin.sm}`,
                }}
              >
                <IconBase slug="icon-search" />
              </Box>
            </InputRightElement>
          </Box>
          {showSuggestions && (
            <Box
              width={"100%"}
              marginTop={style.margin.sm}
              borderRadius={style.card.borderRadius.default}
              background={style.card.bg.default}
              boxShadow="-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)"
              border="1px solid rgba(15, 23, 46, 1) !important"
              paddingY={style.padding.xxs}
              overflow="hidden"
              position={"absolute"}
              top="20"
            >
              <Box overflow={"scroll"} height={"15rem"}>
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    paddingRight: `${style.padding.xs}`,
                    paddingLeft: `${style.padding.xs}`,
                    paddingTop: `${style.padding.xxs}`,
                  }}
                >
                  <Text
                    mb={style.margin.xxs}
                    fontSize={style.font.h7}
                    color={style.color["white.5"]}
                  >
                    Trending Searches
                  </Text>
                </Box>

                <SearchRow
                  text="Lens Posts"
                  onClick={() => {
                    router.push("/search?search=lens_post");
                    setShowSuggestions(false);
                  }}
                />
                <SearchRow
                  text="Ens Handles"
                  onClick={() => {
                    router.push("/search?search=ens_ethereum");
                    setShowSuggestions(false);
                  }}
                />
                <SearchRow
                  text="Sound.xyz Music"
                  onClick={() => {
                    router.push("/explore/sound_nft");
                    setShowSuggestions(false);
                  }}
                />
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    paddingRight: `${style.padding.xs}`,
                    paddingLeft: `${style.padding.xs}`,
                    paddingTop: `${style.padding.xxs}`,
                  }}
                >
                  <Text
                    mb={style.margin.xxs}
                    fontSize={style.font.h7}
                    color={style.color["white.5"]}
                  >
                    Explore More
                  </Text>
                </Box>

                <SearchRow
                  text="View content across web3"
                  onClick={() => {
                    router.push("/feed");
                    setShowSuggestions(false);
                  }}
                />

                <SearchRow
                  text="Explore Chains"
                  onClick={() => {
                    router.push("/chains");
                    setShowSuggestions(false);
                  }}
                />
                <SearchRow
                  text="Explore Metas"
                  onClick={() => {
                    router.push("/metas");
                    setShowSuggestions(false);
                  }}
                />
              </Box>
            </Box>
          )}
        </InputGroup>
      </FlexColumn>
      <style jsx>{`
        .searchHeader {
          border: 1px solid #0f172e !important;
        }
        .searchHeader:focus {
          box-shadow: -1px 1px 4px rgba(17, 108, 230, 0.6),
            1px -1px 4px rgba(17, 108, 230, 0.6);
          border: 1px solid rgba(15, 23, 46, 1) !important;
          outline: none !important;
        }
        .searchHeader:focus-visible {
          outline: none !important;
        }
        .searchHeader:hover {
          background: linear-gradient(
            141.09deg,
            rgba(10, 19, 51, 0.5) 11.08%,
            rgba(0, 15, 44, 0.38) 89.68%
          ) !important;
          border: 1px solid rgba(15, 23, 46, 1) !important;
        }
      `}</style>
    </>
  );
};

export default SearchHeader;
