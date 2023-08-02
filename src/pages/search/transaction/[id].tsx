import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import NavBlock from "@/_ui/nav/NavBlock";
import NavTop from "@/_ui/nav/NavTop";
import TagNative from "@/_ui/tag/TagNative";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import TxnDetails from "@/components/studio/TxnDetails";
import { config } from "@/config";
import { getItemFromLocal, setItemOnLocal, truncateAddress } from "@/helpers";
import useMeta from "@/hooks/studio/useMeta";
import useTransaction from "@/hooks/studio/useTransaction";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, useToast } from "@chakra-ui/react";
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
    return (
      <NavTop
        centerElem={<InputSearch />}
        rightElem={
          <FlexRow width="fit-content">
            {$address && <NavButton />}
            {<ConnectWalletButton />}
          </FlexRow>
        }
      />
    );
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
        {" "}
        <NavBlock
          marginTop={style.margin["nav"]}
          back={() => {
            router.back();
          }}

          // paddingTop={style.padding["xxxl"]} marginTop={style.margin["xxxl"]}
        >
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Box style={{ display: "flex" }}>
              <Heading
                fontSize={style.font.h5}
                style={{
                  marginBottom: "0px",
                  marginRight: `${style.margin.xxs}`,
                }}
              >
                {truncateAddress(id)}
              </Heading>
              {hookTxn.transactionDetails && (
                <TagNative
                  value={hookTxn?.transactionDetails[10].name}
                  variant="grey"
                />
              )}
            </Box>
            <Box>
              <ButtonMenu
                options={shareOptions}
                size="sm"
                text="Share"
                height="2.5rem"
                marginRight="0px"
                icon={{ slug: "icon-base-share" }}
              />
            </Box>
          </FlexRow>
        </NavBlock>
        <FlexBody>
          <Box marginTop={style.margin.xl} paddingTop={style.padding.md}>
            <TxnDetails
              id={currentApiId}
              transactionDetails={hookTxn.transactionDetails}
              isLoading={hookTxn.isLoading}
              methodParams={hookTxn.methodParams}
            />
          </Box>
        </FlexBody>
      </>
    );
  };

  return (
    <FlexWindow
      view="col"
      bodyElem={renderBody()}
      navElem={renderNav()}
    ></FlexWindow>
  );
};

export default SearchResult;
