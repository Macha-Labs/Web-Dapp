import ChatSearch from "@/components/chat/chatcontainer/ChatSearch";
import Navigation from "@/_ui/nav/Navigation";
import NavBlock from "@/_ui/nav/NavBlock";
import Filter from "../../components/studio/Filter";
import React from "react";
import FlexRow from "@/_ui/flex/FlexRow";
import NavTabs from "@/_ui/nav/NavTabs";
import { Button } from "@chakra-ui/react";
import { StyledWindow } from "@/styles/StyledComponents";
import Sort from "@/components/studio/Sort";
import MetaCard from "@/components/studio/MetaCard";

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
      <StyledWindow>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs options={dashboardNav} />
            <Button>New Meta</Button>
          </FlexRow>
        </NavBlock>
        <FlexRow width="100%" hrAlign="space-between">
          <FlexRow>
            <ChatSearch />
            <Filter />
          </FlexRow>
          <Sort />
        </FlexRow>
        <FlexRow hrAlign="space-around" width="100%">
          <MetaCard
            image="icon-search"
            heading="META_node"
            description="There is a description here, please mind the gap, something like this and more ..."
            tags={["tag1", "tag2"]}
          />
          <MetaCard
            image="icon-search"
            heading="META_node"
            description="There is a description here, please mind the gap, something like this and more ..."
            tags={["tag1", "tag2"]}
          />
          <MetaCard
            image="icon-search"
            heading="META_node"
            description="There is a description here, please mind the gap, something like this and more ..."
            tags={["tag1", "tag2"]}
          />
        </FlexRow>
      </StyledWindow>
    </>
  );
}
