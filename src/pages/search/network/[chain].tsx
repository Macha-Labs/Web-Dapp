import FlexRow from "@/_ui/flex/FlexRow";
import Loader from "@/_ui/loader/Loader";

import { useRouter } from "next/router";
import { style } from "@/styles/StyledConstants";
import { Divider, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
// import InteractionTable from "@/pages/search/network/InteractionTable";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import React, { useEffect, useState } from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import ContractEditModal from "@/components/studio/ContractEditModal";

import InteractionTable from "@/components/studio/InteractionTable";
import NavBlock from "@/_ui/nav/NavBlock";
import TxnTable from "@/components/studio/TxnTable";
import FlexBody from "@/_ui/flex/FlexBody";
import useContractTxn from "@/hooks/studio/useContractTxn";
import TagNative from "@/_ui/tag/TagNative";

const Network = () => {
  const [activeTab, setActiveTab] = useState(0);
  const hookContractTxn = useContractTxn();
  const router = useRouter();
  //   const isReady = router.isReady;
  const handleTabChange = (index: any) => {
    setActiveTab(index);
  };

  useEffect(() => {
    hookContractTxn._fetch("opensea_ethereum");
  }, []);
  const renderComponent = () => {
    return (
      <>
        <Box marginTop={style.margin.xxl}>
          <>
            <Box>
              {/* <Text fontSize="3rem">Interactions</Text> */}
              <Flex justify="space-between">
                <Box>
                  <Box display="flex" alignItems="center">
                    <Image
                      height="2rem"
                      src="https://ik.imagekit.io/metaworkLabs/Assets/logo/ethereum-eth.svg?updatedAt=1689845348891"
                      alt="ethereum"
                    />
                    <Text
                      fontSize={style.font.h2}
                      fontWeight="600"
                      marginBottom={0}
                      marginLeft={style.margin.xxs}
                    >
                      Ethereum
                    </Text>
                  </Box>
                  <Text>
                    Open source platform to write and distribute decentralized
                    applications.
                  </Text>
                </Box>
                <Box>Symbols</Box>
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
            <Box p={4}>
              <Tabs index={activeTab} onChange={handleTabChange}>
                <TabList>
                  <Tab>Transactions</Tab>
                  <Tab>Blocks</Tab>
                  <Tab>About</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box p={4}>
                      {/* Content for Tab 1 */}
                      This is the content of Tab 1.
                      {/* <TxnTable txnData={hookContractTxn?.filteredData} /> */}
                      <InteractionTable
                        txnData={hookContractTxn?.filteredData}
                      />
                    </Box>
                  </TabPanel>
                  <TabPanel></TabPanel>
                  <TabPanel>
                    <Flex>
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
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
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
              Ethereum
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
