import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useSearch from "@/hooks/studio/useSearch";
import { Box, useColorMode, Image, InputLeftElement, InputGroup } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import InputSearch from "../input/InputSearch";
import IconBase from "../icons/IconsBase";
import useVectorSearch from "@/hooks/studio/useVectorSearch";

type Props = {
  rightElem?: any;
  centerElem?: any;
  search?: boolean;
  showLogo?: boolean;
};

const NavMeta = ({ rightElem, centerElem, search, showLogo }: Props) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(
    search ? search : false
  );
  const hookSearch = useVectorSearch();
  const router = useRouter();
  const { colorMode } = useColorMode()

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          // className="py-3"
          style={{
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.height}`,
            background: `${colorMode == "light" ? style.nav.navLeftBgLight : style.nav.navLeftBg}`,
            border: `${colorMode == "light" ? style.nav.border.light : style.nav.border.default}`,
            borderRadius: `${style.card.borderRadius.default}`,
            boxShadow: `${colorMode == "light" ? "" : "0px 24px 64px 0px #000"}`,
            width: "100%",
          }}
        >
          <FlexRow vrAlign="center" hrAlign="space-between">
            {showLogo && <Image height="30px" src="/assets/macha-image-text.svg" />}
            <FlexRow hrAlign={showLogo ? "flex-end" : "space-between"}>
              {/* <InputGroup> */}
              {/* <InputLeftElement alignItems="start">
                  <Box
                    style={{
                      height: "3rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: `${style.margin.xxs}`,
                    }}
                  >
                    <IconBase slug="icon-search" size="sm" />
                  </Box>
                </InputLeftElement> */}
              <InputSearch
                width="30%"
                height="1rem"
                defaultValue={hookSearch.searchString}
                value={hookSearch.searchString}
                onChange={(e: any) =>
                  hookSearch.setSearchString(e.target.value)
                }
                onKeydown={(e: any) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    router.push(`/search?search=${hookSearch.searchString}`);
                  }
                }}
              />
              {/* </InputGroup> */}
              <ConnectWalletButton
                showBalance={false}
                // height="2.2rem"
                showStudio={true}
              />
            </FlexRow>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavMeta;
