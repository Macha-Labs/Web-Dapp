import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import {
  Avatar,
  Divider,
  Flex,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
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
import NavTop from "@/_ui/nav/NavTop";
import NavButton from "@/components/buttons/NavButton";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useAuthStore from "@/store/useAuthStore";
import { truncateAddress } from "@/helpers";
import InputSearch from "@/_ui/input/InputSearch";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import IconBase from "@/_ui/icons/IconsBase";
import GlobalIcons from "@/styles/GlobalIcons";
import NavStudio from "@/_ui/nav/NavStudio";

const Network = () => {
  const [activeTab, setActiveTab] = useState(0);
  const $address = useAuthStore((state: any) => state.address);
  const hookUserTxn = useUserTxn();
  const router = useRouter();
  const toast = useToast();
  const handleTabChange = (index: any) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const fetch = async () => {
      if (router.isReady) {
        await hookUserTxn._fetch(router.query.user);
      }
    }
    fetch()
  }, [router.query.user, hookUserTxn.page]);

  const renderNav = () => {
    return (
      <NavStudio />
    );
  };

  const renderComponent = () => {
    return (hookUserTxn.isLoading ?
      <FlexRow height="100vh">
        <Loader size="lg" />
      </FlexRow> : (<>
        <Box marginTop={style.margin.xxxl} paddingTop={style.padding.xxxl}>
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
                    src={GlobalIcons["avatar-default"]}
                  />
                  <Text
                    fontSize={style.font.h2}
                    fontWeight="600"
                    marginBottom={0}
                    marginLeft={style.margin.xxs}
                  >
                    {truncateAddress(router.query.user)}
                  </Text>
                  <IconBase
                    slug="icon-copy"
                    style={{ marginLeft: "sm" }}
                    onClick={() => {
                      navigator.clipboard.writeText(String(router.query.user));
                      toast({
                        title: "Copied To Clipboard",
                        status: "success",
                        duration: 3000,
                      });
                    }}
                  />
                </Box>
              </Flex>
              <Flex
                justify="flex-start"
                border={style.card.border.contract}
                borderRadius={style.card.borderRadius.default}
              >
                <Box
                  // flex="1"
                  p={4}
                  display="flex"
                  justifyContent="flex-start"
                ></Box>
                <Box
                  // flex="1"
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
                      {hookUserTxn.totalTxns} Interactions
                    </Text>
                  </Box>
                  {/* <Divider
                    orientation="vertical"
                    margin={0}
                    border={style.card.border.meta}
                    width={"0px"}
                  /> */}
                </Box>
              </Flex>
            </Box>
            <Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "",
                  justifyContent: "space-between",
                  marginBottom: `${style.margin.md}`,
                  marginTop: `${style.margin.lg}`,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ButtonNative
                    marginRight="sm"
                    size="xs"
                    height="2rem"
                    onClick={() => {
                      if (hookUserTxn.page != 1) {
                        hookUserTxn.setIsLoading(true);
                        hookUserTxn.setPage(1);
                      }
                    }}
                    text="Newest"
                    disabled={hookUserTxn.page == 1}
                    variant="state_default_hover"
                  />
                  <ButtonNative
                    marginRight="sm"
                    size="xs"
                    height="2rem"
                    onClick={() => {
                      if (hookUserTxn.page > 1) {
                        hookUserTxn.setIsLoading(true);
                        hookUserTxn.setPage(hookUserTxn.page - 1);
                      }
                    }}
                    text="Prev"
                    disabled={hookUserTxn.page <= 1}
                    variant="state_default_hover"
                  />
                  <Text
                    marginRight={style.margin.sm}
                    marginBottom="0.25rem"
                  >
                    Page {hookUserTxn?.page} of {hookUserTxn.totalPages}
                  </Text>
                  <ButtonNative
                    marginRight="sm"
                    size="xs"
                    height="2rem"
                    onClick={() => {
                      if (hookUserTxn.page < hookUserTxn.totalPages) {
                        hookUserTxn.setIsLoading(true);
                        hookUserTxn.setPage(hookUserTxn.page + 1);
                      }
                    }}
                    disabled={hookUserTxn.page >= hookUserTxn.totalPages}
                    text="Next"
                    variant="state_default_hover"
                  />
                  <ButtonNative
                    marginRight="sm"
                    size="xs"
                    height="2rem"
                    onClick={() => {
                      if (hookUserTxn.page != hookUserTxn.totalPages) {
                        hookUserTxn.setIsLoading(true);
                        hookUserTxn.setPage(hookUserTxn.totalPages);
                      }
                    }}
                    text="Oldest"
                    disabled={hookUserTxn.page == hookUserTxn.totalPages}
                    variant="state_default_hover"
                  />
                </Box>
                <Box>
                  <Text>Total Txns: {hookUserTxn.totalTxns}</Text>
                </Box>
              </Box>
              <Box
                marginTop="1rem"
                border={style.table.border.thead}
                borderRadius="20px"
                marginBottom={style.margin.xxxl}
              >
                {/* Content for Tab 1 */}
                <TxnTable
                  displayFrom={false}
                  txnData={hookUserTxn?.filteredData}
                />
              </Box>
            </Box>
          </>
        </Box>
      </>)
    );
  };
  const renderBody = () => {
    return (
      <>
        <NavBlock
          back={() => {
            router.back();
          }}
          marginTop={style.margin["nav"]}
        >
          <FlexRow hrAlign="flex-start">
            <Text
              fontSize={style.font.h5}
              fontWeight="600"
              marginBottom={0}
            //   marginLeft={style.margin.xxs}
            >
              {truncateAddress(router.query.user)}
            </Text>
          </FlexRow>
        </NavBlock>
        <FlexBody>{renderComponent()}</FlexBody>
      </>
    );
  };
  return (
    <FlexWindow
      view="col"
      bodyElem={renderBody()}
      navTop={renderNav()}
    ></FlexWindow>
  );
};

export default Network;
