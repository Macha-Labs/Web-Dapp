import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import Tabs from "@/_ui/tabs/Tabs";
import MetaCurator from "@/components/studio/MetaCurator";
import TxnDetails from "@/components/studio/TxnDetails";
import MetaOverview from "@/components/studio/MetaOverview";
import MetaSettings from "@/components/studio/MetaSettings";
import { getItemFromLocal, setItemOnLocal } from "@/helpers";
import useMeta from "@/hooks/studio/useMeta";
import useAuthStore from "@/store/useAuthStore";
import useMetaStore from "@/store/useMetaStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateMeta = () => {
  const $userMetasMap = useUserStore((state: any) => state.userMetasMap);
  const $userApisMap = useUserStore((state: any) => state.userApisMap);
  const $meta = useMetaStore((state: any) => state.meta);
  const [currentMetaId, setCurrentMetaId] = useState<any>();
  const [currentApiId, setCurrentApiId] = useState<any>();
  const hookMeta = useMeta();
  const router = useRouter();
  const $address = useAuthStore((state: any) => state.address);

  useEffect(() => {
    if ($userApisMap) {
      let currentApiId: any = router?.query?.id;
      let storedApiId: any = getItemFromLocal("currentApiId");
      if (currentApiId && currentApiId != storedApiId) {
        setItemOnLocal("currentApiId", router?.query?.id);
        setCurrentApiId(currentApiId);
        hookMeta.apiInit($userApisMap[currentApiId]);
      } else {
        console.log("storedApiId", storedApiId);
        setCurrentApiId(storedApiId);
        hookMeta.apiInit($userApisMap[storedApiId]);
      }
    }
  }, [$userMetasMap]);

  const createMetaOptions = [
    {
      value: "Overview",
      href: "",
    },
    {
      value: "Curators",
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
  let options: any;
  if ($meta?.state?.status != "PENDING") {
    if ($meta.owner == $address) options = createMetaOptions;
    else options = createMetaOptions.slice(0, -2);
  } else {
    createMetaOptions.splice(2, 1);
    options = createMetaOptions;
  }
  const renderComponent = () => {
    switch (selectedTab) {
      case "Overview":
        return <MetaOverview metaInfo={$userApisMap[currentApiId]} />;
      case "Curators":
        return <MetaCurator />;
      // case "Playground":
      //   return <SearchDetails id={currentApiId}  />;
      case "Settings":
        return <MetaSettings metaInfo={$userApisMap[currentApiId]} />;
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
            router.back();
          }}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between" >
            <FlexRow width="fit-content">
              <Heading fontSize={style.font.h5} className="m-b-0">
                {/* {$meta?.data?.name} */} Meta name
              </Heading>
            </FlexRow>
            <Tabs
              width="40%"
              options={options}
              hrAlign={"flex-end"}
              value={selectedTab}
              onChange={(value: any) => setSelectedTab(value)}
              gstyle={{ fontSize: `${style.font.h5}` }}
            />
          </FlexRow>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };

  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default CreateMeta;
