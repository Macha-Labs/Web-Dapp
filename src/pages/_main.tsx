import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import SearchHeader from "@/components/search/SearchHeader";
import { style } from "@/styles/StyledConstants";
import { Box, Card, Heading, Image, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavLeft from "@/_ui/nav/NavLeft";
import CardColored from "@/_ui/cards/CardColored";
import FlexRow from "@/_ui/flex/FlexRow";
import { dataPlugins } from "@/data/dataPlugins";

type Props = {
    children?: any;
  };
  

const Main = ({children}: Props) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const renderNav = () => {
    return <NavLeft showLogo={true} />;
  };

  const renderBody = () => {
    return (
      <Box overflowX="hidden">
        <FlexColumn
          hrAlign="flex-start"
          vrAlign="flex-start"
          padding="0rem 0rem"
          height="100vh"
        >
          <Box
            border={colorMode ? "" : style.card.border.default}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            height="80%" //90
            width={"60%"}
            margin={"auto"}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-start"}
          >
            {children}
          </Box>
        </FlexColumn>
      </Box>
    );
  };

  return (
    <>
      <FlexWindow
        view="row" //
        navElem={renderNav()}
        bodyElem={renderBody()}
        marginTop="0"
        padding={"0% 0%"}
        enableBackground={true}
      ></FlexWindow>
    </>
  );
};

export default Main;
