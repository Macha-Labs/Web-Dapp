import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import SearchInput from "@/components/search/SearchInput";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import FlexRow from "../flex/FlexRow";
import NavTop from "./NavTop";
import NavBlock from "./NavBlock";
import Tabs from "../tabs/Tabs";

const NavStudio = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dashboardNav: any = [
    {
      value: "Home",
      href: "/studio",
    },
    {
      value: "Indexers",
      href: "/studio/indexers",
    },
    // {
    //   value: "Functions",
    //   href: "",
    // },
  ];

  return (
    <>
      <NavTop
        centerElem={<SearchInput searchWidth="100%" />}
        rightElem={
          <FlexRow width="fit-content">
            <ConnectWalletButton
              showBalance={true}
              showRegisterPublisher={true}
              showExplorer={true}
            />
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => {
                toggleColorMode();
              }}
            >
              <FlexRow>
                <Image
                  alt="icon"
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
          </FlexRow>
        }
      />
      <NavBlock marginTop={style.margin["subnav"]}>
        <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
          <FlexRow hrAlign="flex-start" vrAlign="center">
            <Tabs
              width="fit-content"
              options={dashboardNav}
              gstyle={{
                fontSize: `${style.font.h5}`,
                // background: `${colorMode == "light" ? "#ffff" : ""}`,
              }}
              value={"Home"}
              onChange={() => {}}
            />
          </FlexRow>
        </FlexRow>
      </NavBlock>
    </>
  );
};

export default NavStudio;
