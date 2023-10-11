import { Box, useColorMode } from "@chakra-ui/react";
import { style } from "../../styles/StyledConstants";
import SearchHeader from "@/components/search/SearchHeader";
import FlexRow from "../flex/FlexRow";

type Props = {};

const NavFooter = ({}: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box width={"100%"} display={"flex"} justifyContent={"center"}>
        <Box
          style={{
            padding: `${style.nav.padding.meta}`,
            height: `${style.nav.heightFooter}`,
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
            // borderRadius: `${style.card.borderRadius.default}`,
            boxShadow: `${
              colorMode == "light" ? "" : "0px 24px 64px 0px #000"
            }`,
            width: "100%",
          }}
        >
          <FlexRow hrAlign="center">
            <SearchHeader height="3rem"/>
          </FlexRow>
        </Box>
      </Box>
    </>
  );
};

export default NavFooter;
