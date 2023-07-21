import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Avatar, Divider, Flex, Image, Link, Text } from "@chakra-ui/react";
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
        <Box marginTop={style.margin.xxxl}>
          <>
            <Box>
              {/* <Text fontSize="3rem">Interactions</Text> */}
              <Flex justify="space-between">
                <Box
                  display="flex"
                  alignItems="center"
                  marginBottom={style.margin.lg}
                >
                  <Avatar
                    size="md"
                    src="https://ik.imagekit.io/metaworkLabs/icons/svg/avatar/Avatar.svg?updatedAt=1685011314873"
                  />
                  <Text
                    fontSize={style.font.h2}
                    fontWeight="600"
                    marginBottom={0}
                    marginLeft={style.margin.xxs}
                  >
                    {router.query.user}
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
            <Box>
              {hookUserTxn.isLoading ? (
                <FlexRow height="100px">
                  <Loader size="lg" />
                </FlexRow>
              ) : (
                hookUserTxn?.filteredData[0] && (
                  <>
                    <Text
                      mt={style.margin.lg}
                      mb={style.margin.lg}
                      style={{
                        background: `-webkit-linear-gradient(270deg,rgb(25, 124, 236),rgb(0, 74, 217))`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Transactions in the last 12 hours{" "}
                    </Text>
                    <Box
                      marginTop="1rem"
                      border={style.table.border.thead}
                      borderRadius="20px"
                    >
                      {/* Content for Tab 1 */}
                      <TxnTable txnData={hookUserTxn?.filteredData} />
                    </Box>
                  </>
                )
              )}
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
