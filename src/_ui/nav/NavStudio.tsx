import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useSearch from "@/hooks/studio/useSearch";
import { Box, Image, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import FlexRow from "../flex/FlexRow";
import InputSearch from "../input/InputSearch";
import NavTop from "./NavTop";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import useVectorSearch from "@/hooks/studio/useVectorSearch";

const NavStudio = () => {
  const hookSearch = useVectorSearch();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <NavTop
      centerElem={
        <InputSearch
          defaultValue={hookSearch.searchString}
          value={hookSearch.searchString}
          height="50px"
          onChange={(e: any) => hookSearch.setSearchString(e.target.value)}
          onKeydown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
              router.push(`/search?search=${hookSearch.searchString}`);
            }
          }}
        />
      }
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
