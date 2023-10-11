import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import SearchInput from "@/components/search/SearchInput";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import FlexRow from "../flex/FlexRow";
import NavTop from "./NavTop";

const NavStudio = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <NavTop
      centerElem={<SearchInput />}
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
  );
};

export default NavStudio;
