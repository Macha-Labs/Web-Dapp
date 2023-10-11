import CardNative from "@/_ui/cards/CardNative";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import LeaderboardTable from "@/components/table/LeaderboardTable";
import UserXpTable from "@/components/table/UserXpTable";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, useColorMode } from "@chakra-ui/react";

const Xps = () => {

  const {colorMode} = useColorMode()
  
  const renderBody = () => {
    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <CardNative
          height="fit-content"
          marginTop="xl"
          width="50%"
          marginRight="lg"
          header={
            <FlexRow hrAlign="space-between" overFlow={"hidden"}>
              <Heading
                color={colorMode == "light" ? "#000" : ""}
                fontSize={style.font.h3}
                fontWeight={600}
                className="m-b-0"
              >
                Leaderboard - Top 30
              </Heading>
              <Image src={GlobalIcons["icon-search"]} cursor="pointer" />
            </FlexRow>
          }
        >
          <LeaderboardTable />
        </CardNative>
        <CardNative
          height="fit-content"
          marginTop="xl"
          width="50%"
          header={
            <FlexRow hrAlign="space-between">
              <Heading
                color={colorMode == "light" ? "#000" : ""}
                fontSize={style.font.h3}
                fontWeight={600}
                className="m-b-0"
              >
                Earn Rewards
              </Heading>
              <Image src={GlobalIcons["icon-search"]} cursor="pointer" />
            </FlexRow>
          }
        >
          <UserXpTable />
        </CardNative>
      </Box>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={<NavLeft />}
      navTop={<NavHeader />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Xps;
