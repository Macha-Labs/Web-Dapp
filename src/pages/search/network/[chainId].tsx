import FlexRow from "@/_ui/flex/FlexRow";

import { style } from "@/styles/StyledConstants";
import { Divider, Flex, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import InteractionTable from "@/pages/search/network/InteractionTable";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import Loader from "@/_ui/loader/Loader";
import NavBlock from "@/_ui/nav/NavBlock";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import TxnTable from "@/components/studio/TxnTable";
import chains from "@/data/network";
import useChainTxn from "@/hooks/studio/useChainTxn";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Network = () => {
  const hookChainTxn = useChainTxn();
  const router = useRouter();
  const chainId: any = router.query.chainId
  const isReady = router.isReady;
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Transactions");

  useEffect(() => {
    if (isReady) {
      hookChainTxn._fetch(router.query.chainId);
    }
  }, [router.query.chainId]);

  const chainNav: any = [
    {
      value: "Transactions",
      href: "#",
    },
    {
      value: "Blocks",
      href: "#",
    },
    {
      value: "About",
      href: "#",
    },
  ];

  const renderAbout = () => {
    return <>{selectedNavTab == "About" && <Flex>
      <Box flex="7" p={4}>
        {/* Content for column 1 */}

        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column">
            <Text fontWeight={style.fontWeight.dark}>
              About Ethereum
            </Text>
            <Text>
              Ethereum is a technology that&apos;s home to
              digital money, global payments, and applications.
              The community has built a booming digital economy,
              bold new ways for creators to earn online, and so
              much more. It&apos;s open to everyone, wherever
              you are in the world – all you need is the
              internet.
            </Text>
            <Text fontWeight={style.fontWeight.dark}>Team</Text>
          </Box>
          <Box>
            <Text fontWeight={style.fontWeight.dark}>
              Compatible Wallets
            </Text>
            <Box display="flex" flex="flex-wrap">
              <TagNative size="sm" value="Trust Wallet" />
              <TagNative size="sm" value="Zeroin" />
              <TagNative size="sm" value="Tally Ho" />
              <TagNative size="sm" value="Coinbase Wallet" />
              <TagNative size="sm" value="Metamask" />
              <TagNative size="sm" value="Safe" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex="3" p={4}>
        {/* Content for column 2 */}
        <Text fontWeight={style.fontWeight.dark}>
          Official Links
        </Text>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Link href="github.com/ethereum">
            github.com/ethereum
          </Link>
          <Link href="github.com/ethereum">
            github.com/ethereum
          </Link>
          <Link href="github.com/ethereum">
            github.com/ethereum
          </Link>
        </Box>
      </Box>
    </Flex>}</>;
  };

  const renderTxns = () => {
    return <>{selectedNavTab == "Transactions" && <>
      {hookChainTxn.isLoading ? (
        <FlexRow height="100px">
          <Loader size="lg" />
        </FlexRow>
      ) :
        (hookChainTxn?.filteredData[0] &&
          <>
            <Box
              border={style.table.border.thead}
              borderRadius="20px"
            >
              {/* Content for Tab 1 */}
              {hookChainTxn?.filteredData[0] && <TxnTable txnData={hookChainTxn?.filteredData} />}
            </Box>
            <Box marginY={10} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              {hookChainTxn.filteredData.length >= 10 && <ButtonNative
                variant="state_brand"
                marginTop={style.margin["lg"]}
                onClick={() => hookChainTxn._fetch(router.query.chainId)}
                >
                Next
              </ButtonNative>}
            </Box>
          </>
        )}
    </>}</>;
  };

  const renderComponent = () => {
    return (
      <>
        <Box marginTop={style.margin.xxxl}>
          <>
            <Box>
              {/* <Text fontSize="3rem">Interactions</Text> */}
              <Flex justify="space-between">
                <Box>
                  <Box display="flex" alignItems="center" marginBottom={style.margin.md}>
                    <IconBase
                      size="2xl"
                      slug={chainId && chains[chainId]?.chainImage}
                    />
                    <Text
                      fontSize={style.font.h1}
                      fontWeight="600"
                      marginBottom={0}
                      marginLeft={style.margin.xxs}
                    >
                      {chainId && chains[chainId]?.chainName}
                    </Text>
                  </Box>
                  <Text>
                    Open source platform to write and distribute decentralized
                    applications.
                  </Text>
                </Box>
                {/* <Box>Symbols</Box> */}
              </Flex>
              <Flex
                justify="space-between"
                border={style.card.border.contract}
                borderRadius={style.card.borderRadius.default}
              >
                <Box
                  flex="1"
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text marginBottom={0}>Market Cap</Text>
                    <Text
                      fontWeight={style.fontWeight.extraDark}
                      marginBottom={0}
                    >
                      $230.79B
                    </Text>
                    <Text>120.2M ETH</Text>
                  </Box>

                  <Divider
                    orientation="vertical"
                    margin={0}
                    border={style.card.border.meta}
                    width={"0px"}
                  />
                </Box>
                <Box
                  flex="1"
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text marginBottom={0}>Interactions</Text>
                    <Text
                      marginBottom={0}
                      fontWeight={style.fontWeight.extraDark}
                    >
                      1,999,185,792
                    </Text>
                    <Text>8.83 interactions per second</Text>
                  </Box>
                  <Divider
                    orientation="vertical"
                    margin={0}
                    border={style.card.border.meta}
                    width={"0px"}
                  />
                </Box>
                <Box
                  flex="1"
                  p={4}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text marginBottom={0}>EHT Price</Text>
                    <Text
                      marginBottom={0}
                      fontWeight={style.fontWeight.extraDark}
                    >
                      US$1,920.18
                    </Text>
                    <Text>$230.81B</Text>
                  </Box>
                  <Divider
                    orientation="vertical"
                    margin={0}
                    border={style.card.border.meta}
                    width={"0px"}
                  />
                </Box>
                <Box flex="1" p={4}>
                  <Text marginBottom={0}>Latest Block</Text>
                  <Text
                    marginBottom={0}
                    fontWeight={style.fontWeight.extraDark}
                  >
                    17734045
                  </Text>
                  <Text>less than a minute</Text>
                </Box>
              </Flex>
            </Box>
            <Box marginTop={style.margin.md}>
              <Tabs
                width="fit-content"
                options={chainNav}
                gstyle={{ fontSize: `${style.font.h5}`, marginBottom: `${style.margin.md}` }}
                value={selectedNavTab}
                onChange={setSelectedNavTab}
              />
              {/* <Divider /> */}
              {renderTxns()}
              {renderAbout()}
            </Box>
          </>
        </Box>
      </>
    );
  };
  const renderBody = () => {
    return (
      <>
        <NavBlock
          back={() => {
            router.back();
          }}
        >
          <FlexRow hrAlign="flex-start">
            <Text
              fontSize={style.font.h7}
              fontWeight="600"
              marginBottom={0}
            //   marginLeft={style.margin.xxs}
            >
              {chainId && chains[chainId]?.chainName}
            </Text>
          </FlexRow>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };
  return <FlexWindow view="col" bodyElem={renderBody()}></FlexWindow>;
};

export default Network;