import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import TxnDetails from "@/components/studio/TxnDetails"; 
import { getItemFromLocal, setItemOnLocal, truncateAddress } from "@/helpers";
import useMeta from "@/hooks/studio/useMeta";
import useAuthStore from "@/store/useAuthStore";
import useMetaStore from "@/store/useMetaStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const $userMetasMap = useUserStore((state: any) => state.userMetasMap);
  const $userApisMap = useUserStore((state: any) => state.userApisMap);
  const [currentApiId, setCurrentApiId] = useState<any>();
  const hookMeta = useMeta();
  const router = useRouter();

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
          <FlexRow width="100%" vrAlign="center" hrAlign="flex-start">
            <Heading fontSize={style.font.h5} className="m-b-0">{truncateAddress(id)}</Heading>
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <TxnDetails id={currentApiId} transactionHash={id} />
        </FlexBody>
      </>
    );
  };

  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default SearchResult;
