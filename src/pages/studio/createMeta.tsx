import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaCreateInfoCard from "@/components/studio/MetaCreateInfoCard";
import MetaOverview from "@/components/studio/MetaOverview";
import MetaSettings from "@/components/studio/MetaSettings";
import { metaCreateInfoData } from "@/data/constantData";
import { style } from "@/styles/StyledConstants";
import { useState } from "react";
import MetaCurator from "./MetaCurator";
import MetaPlayground from "./MetaPlayground";

function createMeta() {
  const createMetaOptions = [
    {
      value: "Overview",
      href: "",
    },
    {
      value: "Curator",
      href: "",
    },
    {
      value: "Playground",
      href: "",
    },
    {
      value: "Settings",
      href: "",
    },
  ];
  const [selectedTab, setSelectedTab] = useState("Overview");
  const renderComponent = () => {
    switch (selectedTab) {
      case "Overview":
        return <MetaOverview />;
      case "Curator":
        return <MetaCurator />;
      case "Playground":
        return <MetaPlayground />;
      case "Settings":
        return <MetaSettings />;
      default:
        return null;
    }
  };
  return (
    <>
      <Navigation />

      <NavBlock>
        <MetaCreateInfoCard data={metaCreateInfoData} />
        <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
          <NavTabs
            options={createMetaOptions}
            value={selectedTab}
            onChange={(value) => setSelectedTab(value)}
            gstyle={{ fontSize: `${style.fontH6}`, fontWeight: "600" }}
          />
        </FlexRow>
      </NavBlock>
      <FlexBody>{renderComponent()}</FlexBody>
    </>
  );
}

export default createMeta;
