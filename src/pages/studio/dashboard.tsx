import ChatSearch from "@/components/chat/chatcontainer/ChatSearch";
import Navigation from "@/_ui/nav/Navigation";
import NavBlock from "@/_ui/nav/NavBlock";
import Filter from "../../components/studio/Filter";
import React from "react";
import FlexRow from "@/_ui/flex/FlexRow";
import NavTabs from "@/_ui/nav/NavTabs";
import { Button } from "@chakra-ui/react";
import { StyledWindowTabs } from "@/styles/StyledComponents";
import Sort from "@/components/studio/Sort";

export default function DashBoard() {
  const dashboardNav: any = [
    {
      value: "Live Metas",
      href: "",
    },
    {
      value: "Others",
      href: "",
    },
  ];

  return (
    <>
      {/*  */}
      <Navigation />
      {/*  */}
      <StyledWindowTabs style={{ paddingTop: "73px" }}>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs options={dashboardNav} />
            <Button>New Meta</Button>
          </FlexRow>
        </NavBlock>
        <FlexRow>
          <FlexRow>
            <ChatSearch />
            <Filter />
          </FlexRow>
          <Sort />
        </FlexRow>
      </StyledWindowTabs>
    </>
  );
}
