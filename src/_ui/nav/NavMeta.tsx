import SearchInput from "@/components/search/SearchInput";
import useVectorSearch from "@/hooks/studio/useVectorSearch";
import GlobalIcons from "@/styles/GlobalIcons";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";

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

  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          // className="py-3"
          style={{
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.height}`,
            background: `${
              colorMode == "light"
                ? style.nav.navLeftBgLight
                : style.nav.navLeftBg
            }`,
            border: `${
              colorMode == "light"
                ? style.nav.border.light
                : style.nav.border.default
            }`,
            borderRadius: `${style.card.borderRadius.default}`,
            boxShadow: `${
              colorMode == "light" ? "" : "0px 24px 64px 0px #000"
            }`,
            width: "100%",
          }}
        >
          <FlexRow vrAlign="center" hrAlign="space-between">
            {showLogo && (
              <Image height="30px" src="/assets/macha-image-text.svg" />
            )}
            <FlexRow hrAlign={showLogo ? "flex-end" : "space-between"}>
              <Link href="/">
                <Image
                  height="30px"
                  src={
                    colorMode == "light"
                      ? "/assets/machaTextLogo.svg"
                      : "/assets/MACHALogo.svg"
                  }
                  alt="macha-text-logo"
                  marginRight="1rem"
                  onClick={() => {
                    router.push("/");
                  }}
                />
              </Link>

              <SearchInput />
              <Box
                style={{ cursor: "pointer" }}
                onClick={() => {
                  toggleColorMode();
                }}
              >
                <FlexRow>
                  <Image
                    alt="toogle-button-color"
                    src={
                      colorMode == "light"
                        ? GlobalIcons["icon-dark-mode"]
                        : GlobalIcons["icon-light-mode"]
                    }
                    height="2rem"
                    width="3rem"
                    marginLeft={style.margin.xxs}
                  />
                </FlexRow>
              </Box>
              {/* <ConnectWalletButton
                showBalance={false}
                // height="2.2rem"
                showStudio={true}
              /> */}
            </FlexRow>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavMeta;
