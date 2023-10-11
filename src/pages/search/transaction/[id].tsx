import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import NavStudio from "@/_ui/nav/NavStudio";
import TxnDetails from "@/components/studio/TxnDetails";
import { config } from "@/config";
import { getItemFromLocal, setItemOnLocal } from "@/helpers";
import useMeta from "@/hooks/studio/useMeta";
import useTransaction from "@/hooks/studio/useTransaction";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const $userMetasMap = useUserStore((state: any) => state.userMetasMap);
  const $userApisMap = useUserStore((state: any) => state.userApisMap);
  const $address = useAuthStore((state: any) => state.address);
  const [currentApiId, setCurrentApiId] = useState<any>();
  const hookMeta = useMeta();
  const router = useRouter();
  const hookTxn = useTransaction();
  const { asPath } = router;

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

  const renderNav = () => {
    return <NavStudio />;
  };

  const TWITTER_INTENT_URL = "https://twitter.com/intent/tweet";
  const TWITTER_HANDLE = "Macha0x";
  const twitterShareUrl = new URL(TWITTER_INTENT_URL);
  const twitterSearch = new URLSearchParams({
    url: `${config.hostedUrl}${asPath}`,
    text: "Check out this transaction on Macha",
    via: TWITTER_HANDLE,
  }).toString();
  twitterShareUrl.search = twitterSearch;

  let shareOptions = [
    {
      value: "Twitter",
      leftIcon: "icon-twitter",
      onClick: () => {
        if (router.isReady) {
          window.open(twitterShareUrl.href, "_ blank");
          // router.push()
        }
      },
    },
  ];

  const renderBody = () => {
    return (
      <>
        <Box
          paddingX={style.padding.xxs}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              height: "fit-content",
              width: "100%",
            }}
          >
            {/* <Heading>Meta Name</Heading> */}

            <TxnDetails
              id={currentApiId}
              transactionDetails={hookTxn.transactionDetails}
              isLoading={hookTxn.isLoading}
              methodParams={hookTxn.methodParams}
            />
          </Box>
        </Box>
      </>
    );
  };

  return (
    <FlexWindow
      view="col"
      bodyElem={renderBody()}
      navTop={<NavHeader />}
      // navLeft={<NavLeft />}
    ></FlexWindow>
  );
};

export default SearchResult;
