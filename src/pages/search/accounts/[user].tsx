import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Divider, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import InteractionTable from "@/pages/search/network/InteractionTable";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import TagNative from "@/_ui/tag/TagNative";
import InteractionTable from "@/components/studio/InteractionTable";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUserTxn from "@/hooks/studio/useUserTxn";
import FlexBody from "@/_ui/flex/FlexBody";
import TxnTable from "@/components/studio/TxnTable";
import Loader from "@/_ui/loader/Loader";

const Network = () => {
  const [activeTab, setActiveTab] = useState(0);
  const hookUserTxn = useUserTxn();
  const router = useRouter();
  const handleTabChange = (index: any) => {
    setActiveTab(index);
  };

  useEffect(() => {
    if (router.isReady) {
      hookUserTxn._fetch(router.query.user);
    }
  }, [router.query.user]);

  const renderComponent = () => {
    return (
      <>
        <Box marginTop={style.margin.xxl}>
          <>
            <Box>
              {/* <Text fontSize="3rem">Interactions</Text> */}
              <Flex justify="space-between" marginBottom="1rem">
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
                    0xc3...95ce
                  </Text>
                </Box>
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
                    <Text marginBottom={0}>Networth</Text>
                    <Text
                      fontWeight={style.fontWeight.extraDark}
                      marginBottom={0}
                    >
                      US$0.01
                    </Text>
                    <Text>1 ERC-20 tokens</Text>
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
                    <Text marginBottom={0}>Activity</Text>
                    <Text
                      marginBottom={0}
                      fontWeight={style.fontWeight.extraDark}
                    >
                      17 Interactions
                    </Text>
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
                    <Text marginBottom={0}>Collectibles</Text>
                    <Text
                      marginBottom={0}
                      fontWeight={style.fontWeight.extraDark}
                    >
                      0 Pieces
                    </Text>
                  </Box>
                  <Divider
                    orientation="vertical"
                    margin={0}
                    border={style.card.border.meta}
                    width={"0px"}
                  />
                </Box>
                <Box flex="1" p={4}>
                  <Text marginBottom={0}>Active Since</Text>
                  <Text
                    marginBottom={0}
                    fontWeight={style.fontWeight.extraDark}
                  >
                    Jan 13, 2023
                  </Text>
                  <Text>6 months</Text>
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
                  {hookUserTxn.isLoading ? (
                    <FlexRow height="100px">
                      <Loader size="lg" />
                    </FlexRow>
                  ) : (
                    hookUserTxn?.filteredData[0] && (
                      <TabPanel>
                        <Box
                          marginTop="1rem"
                          border="1px solid #14244b"
                          borderRadius="20px"
                        >
                          {/* Content for Tab 1 */}

                          <TxnTable txnData={hookUserTxn?.filteredData} />
                        </Box>
                      </TabPanel>
                    )
                  )}
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
