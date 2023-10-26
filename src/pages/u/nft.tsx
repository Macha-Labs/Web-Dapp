import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";

import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import NavHeader from "@/_ui/nav/NavHeader";
import NavLeft from "@/_ui/nav/NavLeft";
import Tabs from "@/_ui/tabs/Tabs";
import GraphCard from "@/components/cards/GraphCard";
import SearchHeader from "@/components/search/SearchHeader";
import { exploreModules } from "@/data/studio/constant";
import useMetaList from "@/hooks/meta/useMetasList";
import {
  Box,
  Button,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const options: any = [
    {
      href: "#",
      value: "My NFTs",
    },
    {
      href: "#",
      value: "Recommended NFTs",
    },
  ];
  const [tab, setTab] = useState<string>("My NFTs");
  const [activeButton, setActiveButton] = useState<string>("button1");
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  const hookMetasList = useMetaList();
  const router = useRouter();
  useEffect(() => {
    // hookMetasList._fetchMore("poap_nft", 9);
    hookMetasList._fetchMetaSchemas();
    // hookTransaction.setLatestTransactions(allTransactions);
    // hookMetasList.initialLoadAllMetas(allMetas.data, allMetas.lastPage);
    // hookMetasList.initialLoadMetaSchemas(allMetaSchemas);
  }, []);
  const renderBody = () => {
    return (
      <Box justifyContent="center" alignItems="center">
        <FlexColumn width="100%">
          <Tabs
            options={options}
            onChange={setTab}
            value={tab}
            width="fit-content"
          />
          {tab == "My NFTs" && (
            <>
              <Box
                // height="fit-content"
                display="flex"
                flexDirection="column"
                marginTop={`${style.margin.xl}`}
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src="/assets/empty-state-graphic.svg"
                  alt="empty-state-graphic.svg"
                  marginBottom={`${style.margin.xl}`}
                />
                <Text
                  fontSize={`${style.font.h4}`}
                  fontWeight={`${style.fontWeight.dark}`}
                >
                  You have not claimed any NFT yet
                </Text>
                <Text marginBottom="0">
                  You will be able to search and create contracts once you
                  become
                </Text>
                <Text marginTop="0">
                  a publisher and all the contracts will appear here.
                </Text>
                <Button
                  width="9rem"
                  height="3rem"
                  //   size={props.size}
                  variant="state_brand"
                  //   onClick={openConnectModal}
                  borderRadius={style.button.borderRadius.default}
                  marginLeft={style.margin.xxs}
                >
                  <Text
                    paddingBottom={"0px"}
                    marginBottom="0px"
                    fontSize={`${style.font.h6}`}
                    style={{ marginBottom: "0px", paddingBottom: "0px" }}
                  >
                    Claim NFTs
                  </Text>
                </Button>
              </Box>
            </>
          )}
          {tab == "Recommended NFTs" && (
            <>
              <Flex width="100%" justify="space-between" p={4}>
                <Flex>
                  <Button
                    width="9rem"
                    height="3rem"
                    //   size={props.size}
                    variant={
                      activeButton === "button1"
                        ? "state_brand"
                        : "state_transparent"
                    }
                    //   onClick={openConnectModal}
                    onClick={() => handleButtonClick("button1")}
                    borderRadius={style.button.borderRadius.default}
                    marginLeft={style.margin.xxs}
                  >
                    <Text
                      paddingBottom={"0px"}
                      marginBottom="0px"
                      fontSize={`${style.font.h6}`}
                      style={{ marginBottom: "0px", paddingBottom: "0px" }}
                    >
                      Protocol - NFTs
                    </Text>
                  </Button>
                  <Button
                    width="9rem"
                    height="3rem"
                    //   size={props.size}
                    variant={
                      activeButton === "button2"
                        ? "state_brand"
                        : "state_transparent"
                    }
                    // variant="state_transparent"
                    onClick={() => handleButtonClick("button2")}
                    borderRadius={style.button.borderRadius.default}
                    marginLeft={style.margin.xxs}
                  >
                    <Text
                      paddingBottom={"0px"}
                      marginBottom="0px"
                      fontSize={`${style.font.h6}`}
                      style={{ marginBottom: "0px", paddingBottom: "0px" }}
                    >
                      Chain - NFTs
                    </Text>
                  </Button>
                </Flex>
                <SearchHeader />
              </Flex>

              <FlexRow hrAlign="flex-start" marginTop={"xl"} flexWrap="wrap">
                {hookMetasList?.metaSchemas?.map((schema: any, index: any) => {
                  //console.log(schema, "schema");
                  return (
                    <GraphCard
                      key={index}
                      image={
                        exploreModules.find(
                          (module) => module.heading === schema.name
                        )?.image
                      }
                      user={schema.name}
                      tag={schema.slug}
                      title={schema.description}
                      onCardClick={() => {
                        // schema.available &&
                        router.push(
                          {
                            pathname: `/explore/[id]`,
                            query: {
                              id: schema?.slug,
                            },
                          },
                          `/explore/${schema?.slug}`
                        );
                      }}
                    />
                  );
                })}
              </FlexRow>
            </>
          )}
        </FlexColumn>
      </Box>
    );
  };

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavHeader />;
  };

  return (
    <>
      <FlexWindow
        view="both"
        navLeft={renderNavLeft()}
        navTop={renderNavTop()}
        bodyElem={renderBody()}
      ></FlexWindow>
      {/* <Navigation /> */}
    </>
  );
}
