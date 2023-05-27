import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTabs from "@/_ui/nav/NavTabs";
import Navigation from "@/_ui/nav/Navigation";
import MetaOverview from "@/components/studio/MetaOverview";
import MetaSettings from "@/components/studio/MetaSettings";
import { style } from "@/styles/StyledConstants";
import { useEffect, useState } from "react";
import MetaCurator from "@/components/studio/MetaCurator";
import MetaPlayground from "@/components/studio/MetaPlayground";
import Nav from "@/_ui/nav/Nav";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import FlexColumn from "@/_ui/flex/FlexColumn";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/router";
import { getItemFromLocal, setItemOnLocal } from "@/helpers";
import { Heading } from "@chakra-ui/react";
import useMetaStore from "@/store/useMetaStore";
import useMeta from "@/hooks/studio/useMeta";

const CreateMeta = () => {
  const $userMetasMap = useUserStore((state: any) => state.userMetasMap);
  const $meta = useMetaStore((state: any) => state.meta);
  const [currentMetaId, setCurrentMetaId] = useState<any>();
  const hookMeta = useMeta();
  const router = useRouter();

  useEffect(() => {
    if ($userMetasMap) {
      console.log("logging the router query", router.query);
      let currentId: any = router?.query?.id;
      let storedMetaId: any = getItemFromLocal("currentMetaId");
      if (currentId && currentId != storedMetaId) {
        setItemOnLocal("currentMetaId", router?.query?.id);
        setCurrentMetaId(currentId);
        hookMeta.metaInit($userMetasMap[currentId]);
      } else {
        console.log("storedMetaid", storedMetaId);
        setCurrentMetaId(storedMetaId);
        hookMeta.metaInit($userMetasMap[storedMetaId]);
      }
    }
  }, [$userMetasMap]);

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
        return <MetaOverview metaInfo={$userMetasMap[currentMetaId]} />;
      case "Curator":
        return <MetaCurator />;
      case "Playground":
        return <MetaPlayground id={currentMetaId} />;
      case "Settings":
        return <MetaSettings metaInfo={$userMetasMap[currentMetaId]} />;
      default:
        return null;
    }
  };

  const renderBody = () => {
    return (
      <>
        {" "}
        <NavBlock
          back={() => {
            router.push("/studio/dashboard");
          }}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <FlexRow width="fit-content">
              <Heading as="h5" fontSize={style.font.h5} className="m-b-0">
                {$meta?.data?.name}
              </Heading>
            </FlexRow>
            <NavTabs
              options={createMetaOptions}
              value={selectedTab}
              onChange={(value: any) => setSelectedTab(value)}
              gstyle={{ fontSize: `${style.fontH6}`, fontWeight: "600" }}
            />
          </FlexRow>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };

  return <FlexWindow leftElem={<Nav />} rightElem={renderBody()}></FlexWindow>;
};

export default CreateMeta;
