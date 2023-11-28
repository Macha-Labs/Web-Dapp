import FlexColumn from "@/_ui/flex/FlexColumn";
import IconBase from "@/_ui/icons/IconsBase";
import useSearch from "@/_sdk/hooks/useSearch";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  InputGroup,
  InputLeftElement,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import SearchOption from "./SearchOption";
import { useRouter } from "next/router";
import useEmbeddSearch from "@/_sdk/hooks/useEmbeddSearch";

type Props = {
  options?: any;
  height?: any;
};

const SearchEmbedd = ({ options, height }: Props) => {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const hookEmbeddSearch = useEmbeddSearch()
  const { colorMode } = useColorMode();
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
            <InputLeftElement alignItems="start">
              <Box
                style={{
                  height: height ? height : "5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: `${style.margin.sm}`,
                }}
              >
                <IconBase slug="icon-search" size="3xl" />
              </Box>
            </InputLeftElement>
            <input
              value={hookEmbeddSearch.inputValue} // Use local state to control the input value
              type="text"
              ref={hookEmbeddSearch.searchRef}
              className="SearchEmbedd"
              onChange={hookEmbeddSearch.handleInputChange} // Call handleInputChange when input changes
              onKeyDown={hookEmbeddSearch.handleRoute} // Call handleKeyDown on Enter key press
              placeholder="Try Spectacular Search Now"
              style={{
                height: height ? height : "5rem",
                color: `${colorMode == "light" ? "#3d3d3d" : ""}`,
                borderRadius: `${style.card.borderRadius.default}`,
                fontSize: `${style.font.h6}`,
                paddingRight: `${style.padding.xl}`,
                paddingLeft: `${style.padding.xxl}`,
                background: `${
                  colorMode == "light"
                    ? "rgba(255,255,255,1)"
                    : style.input.bg.default
                }`,
                border: `${
                  colorMode == "light" ? "1px solid #e2e2e2" : style.input.border.default
                }`,
                width: "100%",
              }}
            />
          </Box>
          {showSuggestions && (
            <Box
              sx={{
                "&::-webkit-scrollbar-thumb": {
                  width: "1px !important",
                },
              }}
              width={"100%"}
              marginTop={style.margin.sm}
              borderRadius={style.card.borderRadius.default}
              background={colorMode == "light" ? "#fff" : style.card.bg.default}
              boxShadow="-1px 1px 4px rgba(17, 108, 230, 0.6),1px -1px 4px rgba(17, 108, 230, 0.6)"
              border={
                colorMode == "light"
                  ? ""
                  : "1px solid rgba(15, 23, 46, 1) !important"
              }
              paddingY={style.padding.xxs}
              overflow="hidden"
              position={"absolute"}
              top="20"
              zIndex={200}
            >
              <Box
                overflowY={"scroll"}
                height={"15rem"}
                paddingX={style.padding.xs}
              >
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
                    color={
                      colorMode == "light" ? "#282828" : style.color["white.5"]
                    }
                    fontWeight={style.fontWeight.dark}
                  >
                    Trending Searches
                  </Text>
                </Box>

                <SearchOption
                  image={GlobalIcons["logo-Lens"]}
                  text="Lens Posts"
                  onClick={() => {
                    router.push("/search?slug=lens_post");
                    setShowSuggestions(false);
                  }}
                />
                <SearchOption
                  image={GlobalIcons["logo-Ens"]}
                  text="Ens Handles"
                  onClick={() => {
                    router.push("/search?slug=ens_ethereum");
                    setShowSuggestions(false);
                  }}
                />
                <SearchOption
                  image={GlobalIcons["logo-Sound.xyz"]}
                  text="Sound.xyz Music"
                  onClick={() => {
                    router.push("/search?slug=sound_xyz");
                    setShowSuggestions(false);
                  }}
                />
                <SearchOption
                  image={GlobalIcons["logo-Poap"]}
                  text="Poap Nfts"
                  onClick={() => {
                    router.push("/search?slug=poap_nft");
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
                    color={
                      colorMode == "light" ? "#282828" : style.color["white.5"]
                    }
                    fontWeight={style.fontWeight.dark}
                  >
                    Explore More
                  </Text>
                </Box>

                <SearchOption
                  text="View content across web3"
                  onClick={() => {
                    router.push("/feed");
                    setShowSuggestions(false);
                  }}
                />

                <SearchOption
                  text="Explore Chains"
                  onClick={() => {
                    router.push("/chains");
                    setShowSuggestions(false);
                  }}
                />
                <SearchOption
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
        .SearchEmbedd {
        }
        ${colorMode == "light"
          ? `.SearchEmbedd:focus {
          box-shadow: -1px 1px 4px rgba(17, 108, 230, 0.6),
            1px -1px 4px rgba(17, 108, 230, 0.6);
          outline: none !important;
        }`
          : `.SearchEmbedd:focus {
          box-shadow: -1px 1px 4px rgba(17, 108, 230, 0.6),
            1px -1px 4px rgba(17, 108, 230, 0.6);
          border: 1px solid rgba(15, 23, 46, 1) !important;
          outline: none !important;
        }`}

        .SearchEmbedd:focus-visible {
          outline: none !important;
        }

        ${colorMode == "light"
          ? ""
          : `.SearchEmbedd:hover {
          background: linear-gradient(
            141.09deg,
            rgba(10, 19, 51, 0.5) 11.08%,
            rgba(0, 15, 44, 0.38) 89.68%
          ) !important;
          border: 1px solid rgba(15, 23, 46, 1) !important;
          box-shadow: -7.993527412414551px 7.993527412414551px 15.987054824829102px 0px rgba(0, 0, 0, 0.2) !important;
        }`}
      `}</style>
    </>
  );
};

export default SearchEmbedd;
