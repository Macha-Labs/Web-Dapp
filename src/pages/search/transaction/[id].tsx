import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import Tabs from "@/_ui/tabs/Tabs";
import MetaCurator from "@/components/studio/MetaCurator";
import SearchDetails from "@/components/search/SearchDetails";
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

const SearchResult = () => {
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

  const tabOptions = [
    {
      value: "Deatils",
      href: "",
    },
  ];

  const [selectedTab, setSelectedTab] = useState("Details");

  const id = router.query.id

  const renderBody = () => {
    return (
      <>
        {" "}
        <NavBlock
          back={() => {
            router.back();
          }}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="flex-end">
            <Tabs
              width="10%"
              options={tabOptions}
              value={selectedTab}
              onChange={(value: any) => setSelectedTab(value)}
              gstyle={{ fontSize: `${style.font.h5}` }}
            />
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <SearchDetails id={currentApiId} transactionHash={id}/>
        </FlexBody>
      </>
    );
  };

  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default SearchResult;
