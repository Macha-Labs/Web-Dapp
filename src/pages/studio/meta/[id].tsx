import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaOverview from "@/components/studio/MetaOverview";
import MetaSettings from "@/components/studio/MetaSettings";
import { style } from "@/styles/StyledConstants";
import { useState } from "react";
import MetaCurator from "@/components/studio/MetaCurator";
import MetaPlayground from "@/components/studio/MetaPlayground";
import Nav from "@/_ui/nav/Nav";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/router";

const CreateMeta = () => {
  const router = useRouter();
  const $userMetasMap = useUserStore((state: any) => state.userMetasMap);

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
    {
      value: "Access",
      href: "",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("Overview");

  const renderComponent = () => {
    switch (selectedTab) {
      case "Overview":
        return <MetaOverview metaInfo={$userMetasMap["9n"]} />;
      case "Curator":
        return <MetaCurator />;
      case "Playground":
        return <MetaPlayground id="9n" />;
      case "Settings":
        return <MetaSettings />;
      default:
        return null;
    }
  };

  const renderBody = () => {
    return (
      <>
        {" "}
        <NavBlock back={() => {}}>
          <FlexColumn>
            <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
              <NavTabs
                options={createMetaOptions}
                value={selectedTab}
                onChange={(value: any) => setSelectedTab(value)}
                gstyle={{ fontSize: `${style.fontH6}`, fontWeight: "600" }}
              />
            </FlexRow>
          </FlexColumn>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };

  return <FlexWindow leftElem={<Nav />} rightElem={renderBody()}></FlexWindow>;
};

export default CreateMeta;
