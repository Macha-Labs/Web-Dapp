import InputSearch from "@/_ui/input/InputSearch";
import Navigation from "@/_ui/nav/Navigation";
import NavBlock from "@/_ui/nav/NavBlock";
import React from "react";
import FlexRow from "@/_ui/flex/FlexRow";
import NavTabs from "@/_ui/nav/NavTabs";
import { Button } from "@chakra-ui/react";
import MetaCard from "@/components/studio/MetaCard";
import { style } from "@/styles/StyledConstants";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import InputSelect from "@/_ui/input/InputSelect";
import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";

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

  const filterOptions = [
    {
      value: "Contract",
      onClick: () => {},
    },
    {
      value: "Rest",
      onClick: () => {},
    },
    {
      value: "Graph",
      onClick: () => {},
    },
  ];

  return (
    <>
      {/*  */}
      <Navigation />
      {/*  */}
      <FlexWindow>
        <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <NavTabs options={dashboardNav} />
            <ButtonNative text="Create Metas" variant="state_brand" />
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <FlexRow
            width="100%"
            hrAlign="space-between"
            padding={`${style.padding.md} 0rem`}
          >
            <FlexRow width="100%" hrAlign="flex-start">
              <FlexRow width="50%">
                <InputSearch
                  size="lg"
                  placeholder="Search Studio"
                  icon={{ slug: "icon-search" }}
                />
              </FlexRow>
              <ButtonMenu
                text="Filter By"
                options={filterOptions}
                icon={{
                  slug: "icon-chevron-down",
                }}
              />
            </FlexRow>
            <ButtonMenu
              text="Sort By"
              icon={{
                slug: "icon-chevron-down",
              }}
              options={filterOptions}
            />
          </FlexRow>
          <FlexRow
            hrAlign="space-between"
            width="100%"
            // padding={style.body.padding}
          >
            <MetaCard
              image="../assets/MetaCard.png"
              heading="META_node"
              description="There is a description here, please mind the gap, something like this and more ..."
              tags={["tag1", "tag2"]}
            />
            <MetaCard
              image="../assets/MetaCard.png"
              heading="META_node"
              description="There is a description here, please mind the gap, something like this and more ..."
              tags={["tag1", "tag2"]}
            />
            <MetaCard
              image="../assets/MetaCard.png"
              heading="META_node"
              description="There is a description here, please mind the gap, something like this and more ..."
              tags={["tag1", "tag2"]}
            />
          </FlexRow>
        </FlexBody>
      </FlexWindow>
    </>
  );
}
