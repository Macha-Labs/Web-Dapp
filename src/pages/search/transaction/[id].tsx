import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import TxnDetails from "@/components/studio/TxnDetails";
import { getItemFromLocal, setItemOnLocal, truncateAddress } from "@/helpers";
import useContractTxn from "@/hooks/studio/useContractTxn";
import useMeta from "@/hooks/studio/useMeta";
import useTransaction from "@/hooks/studio/useTransaction";
import useAuthStore from "@/store/useAuthStore";
import useMetaStore from "@/store/useMetaStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const $userMetasMap = useUserStore((state: any) => state.userMetasMap);
  const $userApisMap = useUserStore((state: any) => state.userApisMap);
  const [currentApiId, setCurrentApiId] = useState<any>();
  const hookMeta = useMeta();
  const router = useRouter();
  const hookTxn = useTransaction();

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

  useEffect(() => {
    if (router.isReady) {
      hookTxn._fetch(router.query.id);
    }
  }, [router.query.id]);

  const id = router.query.id;

  const renderBody = () => {
    return (
      <>
        {" "}
        <Box style={{paddingTop:"3.2rem", marginTop:"3.2rem"}}>
          <NavBlock
            back={() => {
              router.back();
            }}

            // paddingTop={style.padding["xxxl"]} marginTop={style.margin["xxxl"]}
          >
            <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
              <Heading fontSize={style.font.h5} className="m-b-0">
                {truncateAddress(id)}
              </Heading>
              <ButtonNative
                textFontSize="h7"
                size="sm"
                variant="state_brand"
                text="Share"
                marginRight="0px"
                iconRight={{
                  slug: "icon-base-share",
                  style: { marginLeft: "xxs" },
                  size: "xs",
                }}
              />
            </FlexRow>
          </NavBlock>
        </Box>
        <FlexBody>
          <TxnDetails
            id={currentApiId}
            transactionDetails={hookTxn.transactionDetails}
            isLoading={hookTxn.isLoading}
            methodParams={hookTxn.methodParams}
          />
        </FlexBody>
      </>
    );
  };

  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default SearchResult;
