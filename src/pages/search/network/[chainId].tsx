import FlexRow from "@/_ui/flex/FlexRow";

import { style } from "@/styles/StyledConstants";
import { Divider, Flex, Link, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import InteractionTable from "@/pages/search/network/InteractionTable";
import Header from "@/_ui/Head/Header";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import Loader from "@/_ui/loader/Loader";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavStudio from "@/_ui/nav/NavStudio";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import ContractList from "@/components/studio/ContractList";
import TxnTable from "@/components/studio/TxnTable";
import chains from "@/data/network";
import useAlchemy from "@/hooks/studio/useAlchemy";
import useChainContracts from "@/hooks/studio/useChainContracts";
import useChainTxn from "@/hooks/studio/useChainTxn";
import useContractList from "@/hooks/studio/useContractList";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavHeader from "@/_ui/nav/NavHeader";

const Network = () => {
  const hookChainTxn = useChainTxn();
  const router = useRouter();
  const chainId: any = router.query.chainId;
  const isReady = router.isReady;
  const hookAlchemy = useAlchemy();
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Contracts");
  const hookContractList = useContractList();
  const hookChainContracts = useChainContracts();
  const { colorMode } = useColorMode();

  const renderNav = () => {
    return <NavStudio />;
  };

  useEffect(() => {
    const fetch = async () => {
      if (isReady) {
        await hookAlchemy.getLatestBlockByChainId(Number(router.query.chainId));
        await hookChainTxn._fetch(router.query.chainId);
        await hookContractList.handleFilter(chainId);
      }
    };
    fetch();
  }, [router.query.chainId, hookChainTxn.page]);

  const chainNav: any = [
    {
      value: "Contracts",
      href: "#",
    },
    {
      value: "Transactions",
      href: "#",
    },
    {
      value: "About",
      href: "#",
    },
  ];

  const renderContracts = () => {
    // console.log("chain contracts", hookContractList?.filterData);
    // console.log(hookChainContracts.contracts);
    return (
      <>
        {selectedNavTab == "Contracts" && hookChainContracts?.contracts && (
          <ContractList
            openInNewTab={false}
            data={hookChainContracts.contracts}
          />
        )}
      </>
    );
  };

  const renderAbout = () => {
    return (
      <>
        {selectedNavTab == "About" && (
          <Flex>
            <Box flex="7">
              {/* Content for column 1 */}
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column">
                  <Text
                    color={colorMode == "light" ? "#3d3d3d" : ""}
                    fontWeight={style.fontWeight.dark}
                    fontSize={style.font.h5}
                  >
                    About {chains[chainId].chainName}
                  </Text>
                  <Text color={colorMode == "light" ? "#3d3d3d" : ""}>
                    {chains[chainId].about}
                  </Text>
                </Box>
                <Box display="flex" flexDirection="column">
                  <Text
                    color={colorMode == "light" ? "#3d3d3d" : ""}
                    fontWeight={style.fontWeight.dark}
                    fontSize={style.font.h5}
                  >
                    Team
                  </Text>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {chains[chainId].team.map((member: any, index: any) => (
                      <Box
                        key={index}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Text
                          style={{
                            marginRight: `${style.margin.xxs}`,
                            color: `${
                              colorMode == "light" ? "#3d3d3d" : "dodgerblue"
                            }`,
                          }}
                        >
                          {member.name}
                        </Text>
                        <Text
                          color={colorMode == "light" ? "#3d3d3d" : ""}
                          style={{ marginRight: `${style.margin.xxs}` }}
                        >
                          {member.designation}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Text
                    color={colorMode == "light" ? "#3d3d3d" : ""}
                    fontWeight={style.fontWeight.dark}
                    fontSize={style.font.h5}
                  >
                    Compatible Wallets
                  </Text>
                  <Box display="flex" flex="flex-wrap">
                    {chains[chainId].wallets.map((wallet: any, index: any) => (
                      <Link href={wallet.link} target="_blank" key={index}>
                        <TagNative size="md" value={wallet.title} />
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box flex="3" p={4}>
              {/* Content for column 2 */}
              <Text
                color={colorMode == "light" ? "#3d3d3d" : ""}
                fontWeight={style.fontWeight.dark}
                fontSize={style.font.h5}
              >
                Official Links
              </Text>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                {chains[chainId].links.map((link: any, index: any) => (
                  <Link
                    mb={style.margin.xxs}
                    key={index}
                    target="_blank"
                    href={link.link}
                    color={colorMode == "light" ? "#3d3d3d" : ""}
                  >
                    {link.title}
                  </Link>
                ))}
              </Box>
            </Box>
          </Flex>
        )}
      </>
    );
  };

  const renderTxns = () => {
    return (
      <>
        {selectedNavTab == "Transactions" && !hookChainTxn.isLoading && (
          <Box paddingBottom={style.margin.xxl}>
            <Box
              style={{
                display: "flex",
                alignItems: "end",
                marginBottom: `${style.margin.md}`,
              }}
            >
              <ButtonNative
                marginRight="sm"
                size="xs"
                height="2rem"
                onClick={() => {
                  if (hookChainTxn.page != 1) {
                    hookChainTxn.setIsLoading(true);
                    hookChainTxn.setPage(1);
                  }
                }}
                text="Newest"
                disabled={hookChainTxn.page == 1}
                variant={
                  colorMode == "light" ? "state_light" : "state_default_hover"
                }
              />
              <ButtonNative
                marginRight="sm"
                // textColor="#3d3d3d"
                size="xs"
                height="2rem"
                onClick={() => {
                  if (hookChainTxn.page > 1) {
                    hookChainTxn.setIsLoading(true);
                    hookChainTxn.setPage(hookChainTxn.page - 1);
                  }
                }}
                text="Prev"
                disabled={hookChainTxn.page <= 1}
                variant={
                  colorMode == "light" ? "state_light" : "state_default_hover"
                }
              />
              <Text
                color={colorMode == "light" ? "#3d3d3d" : ""}
                marginRight={style.margin.sm}
                marginBottom="0.25rem"
              >
                Page {hookChainTxn?.page} of{" "}
                {hookChainTxn.totalPages.toLocaleString("en-US")}
              </Text>
              <ButtonNative
                marginRight="sm"
                size="xs"
                height="2rem"
                onClick={() => {
                  if (hookChainTxn.page < hookChainTxn.totalPages) {
                    hookChainTxn.setIsLoading(true);
                    hookChainTxn.setPage(hookChainTxn.page + 1);
                  }
                }}
                disabled={hookChainTxn.page >= hookChainTxn.totalPages}
                text="Next"
                variant={
                  colorMode == "light" ? "state_light" : "state_default_hover"
                }
              />
              <ButtonNative
                marginRight="sm"
                size="xs"
                height="2rem"
                onClick={() => {
                  if (hookChainTxn.page != hookChainTxn.totalPages) {
                    hookChainTxn.setIsLoading(true);
                    hookChainTxn.setPage(hookChainTxn.totalPages);
                  }
                }}
                text="Oldest"
                disabled={hookChainTxn.page == hookChainTxn.totalPages}
                variant={
                  colorMode == "light" ? "state_light" : "state_default_hover"
                }
              />
            </Box>
            <Box
              border={
                colorMode == "light"
                  ? "1px solid #e2e2e2"
                  : style.table.border.thead
              }
              borderRadius="20px"
            >
              {hookChainTxn?.filteredData && (
                <TxnTable txnData={hookChainTxn?.filteredData} />
              )}
            </Box>
          </Box>
        )}
      </>
    );
  };

  const renderComponent = () => {
    return hookChainTxn.isLoading ? (
      <FlexRow height="100vh">
        <Loader size="lg" />
      </FlexRow>
    ) : hookChainTxn.contractTxnDetails != undefined ? (
      <>
        <Box>
          <Flex justify="space-between">
            <Box>
              <Box
                display="flex"
                alignItems="center"
                marginBottom={style.margin.md}
              >
                <IconBase
                  size="2xl"
                  slug={chainId && chains[chainId]?.chainImage}
                />
                <Text
                  color={colorMode == "light" ? "#3d3d3d" : ""}
                  fontSize={style.font.h1}
                  fontWeight="600"
                  marginBottom={0}
                  marginLeft={style.margin.xxs}
                >
                  {chainId && chains[chainId]?.chainName}
                </Text>
              </Box>
            </Box>
            {/* <Box>Symbols</Box> */}
          </Flex>
          <Flex
            justify="space-between"
            background={colorMode == "light" ? "#fff" : ""}
            border={
              colorMode == "light"
                ? "1px solid #e2e2e2"
                : style.card.border.contract
            }
            borderRadius={style.card.borderRadius.default}
          >
            <Box flex="1" p={4} display="flex" justifyContent="space-between">
              <Box>
                <Text
                  color={colorMode == "light" ? "#3d3d3d" : ""}
                  marginBottom={0}
                >
                  Transactions Indexed
                </Text>
                <Text
                  color={colorMode == "light" ? "#3d3d3d" : ""}
                  marginBottom={0}
                  fontWeight={style.fontWeight.extraDark}
                >
                  {hookChainTxn.totalTxns.toLocaleString("en-US")}
                </Text>
              </Box>
              <Divider
                orientation="vertical"
                margin={0}
                border={
                  colorMode == "light"
                    ? "1px solid #e2e2e2"
                    : style.card.border.meta
                }
                width={"0px"}
              />
            </Box>
            <Box flex="1" p={4}>
              <Text
                color={colorMode == "light" ? "#3d3d3d" : ""}
                marginBottom={0}
              >
                Latest Block
              </Text>
              <Text
                color={colorMode == "light" ? "#3d3d3d" : ""}
                marginBottom={0}
                fontWeight={style.fontWeight.extraDark}
              >
                {hookAlchemy.latestBlock}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box marginTop={style.margin.md}>
          <Box marginBottom={style.margin.sm}>
            <Tabs
              width="fit-content"
              options={chainNav}
              gstyle={{
                fontSize: `${style.font.h5}`,
                // marginBottom: `${style.margin.sm}`,
              }}
              value={selectedNavTab}
              onChange={setSelectedNavTab}
            />
          </Box>
          {/* <Divider /> */}
          {renderTxns()}
          {renderAbout()}
          {renderContracts()}
        </Box>
      </>
    ) : (
      <Box>
        <Flex justify="space-between">
          <Box>
            <Box
              display="flex"
              alignItems="center"
              marginBottom={style.margin.md}
            >
              <IconBase
                size="2xl"
                slug={chainId && chains[chainId]?.chainImage}
              />
              <Text
                fontSize={style.font.h1}
                fontWeight="600"
                marginBottom={0}
                marginLeft={style.margin.xxs}
                color={colorMode == "light" ? "black" : ""}
              >
                {chainId && chains[chainId]?.chainName}
              </Text>
            </Box>
          </Box>
          {/* <Box>Symbols</Box> */}
        </Flex>
      </Box>
    );
  };
  const renderBody = () => {
    return <>{renderComponent()}</>;
  };
  return (
    <>
      <Header
        title={`Macha | ${chains[chainId]?.chainName}`}
        
      />
      <FlexWindow
        view="col"
        bodyElem={renderBody()}
        navTop={<NavHeader />}
        // navLeft={<NavLeft />}
      ></FlexWindow>
    </>
  );
};

export default Network;
