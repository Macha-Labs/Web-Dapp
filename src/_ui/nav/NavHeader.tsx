import { Box, useColorMode, Image } from "@chakra-ui/react";
import Tabs from "@/_ui/tabs/Tabs";
import { useRouter } from "next/router";
import { useState } from "react";
import { style } from "../../styles/StyledConstants";
import FlexRow from "../flex/FlexRow";
import FlexColumn from "../flex/FlexColumn";
import GlobalIcons from "@/styles/GlobalIcons";
import Link from "next/link";

type Props = {
  rightElem?: any;
  centerElem?: any;
  search?: boolean;
  showLogo?: boolean;
  field?: any;
};

const NavHeader = ({
  rightElem,
  centerElem,
  search,
  showLogo,
  field,
}: Props) => {
  const router = useRouter();
  const options = [
    {
      href: "/",
      value: "Search",
      condition:
        (router.route == "/search" && !router.query.id) || router.route == "/",
    },
    {
      href: "/search?id=social",
      value: "Socials",
      condition: router.route == "/search" && router.query.id == "social",
    },
    {
      href: "/search?id=music",
      value: "Music",
      condition: router.route == "/search" && router.query.id == "music",
    },
    {
      href: "/search?id=nft",
      value: "NFTs",
      condition: router.route == "/search" && router.query.id == "nft",
    },

    {
      href: "/chains",
      value: "Chains",
      condition: router.route == "/chains",
    },
    {
      href: "/metas",
      value: "Metas",
      condition: router.route == "/metas",
    },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(
    search ? search : false
  );

  const [tab, setTab] = useState<any>(field ? field : "Search");

  return (
    <>
      {//console.log(router, "router value")}
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          style={{
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.height}`,
            background: `${
              colorMode == "light"
                ? style.nav.navLeftBgLight
                : style.nav.navLeftBg
            }`,
            borderBottom: `${
              colorMode == "light"
                ? style.nav.border.light
                : style.nav.border.default
            }`,
            // borderRadius: `${style.card.borderRadius.default}`,
            boxShadow: `${
              colorMode == "light" ? "" : "0px 24px 64px 0px #000"
            }`,
            width: "100%",
          }}
        >
          <FlexRow vrAlign="center" hrAlign="space-between">
            <FlexRow width="20%" hrAlign="flex-start">
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
                />
              </Link>
            </FlexRow>

            <FlexRow hrAlign="center" vrAlign="center" width="50%">
              {//console.log("option tab", tab)}
              <Tabs
                options={options}
                onChange={setTab}
                value={tab}
                width="fit-content"
              />
            </FlexRow>

            <FlexRow hrAlign="flex-end" width="20%">
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

export default NavHeader;
