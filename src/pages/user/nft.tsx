import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";

import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import Marquee from "@/components/Marquee/Marquee";
import TransactionCard from "@/components/cards/TransactionCard";
import CarouselSlide from "@/components/studio/CarouselSlide";
import useTransaction from "@/hooks/studio/useTransaction";
import GlobalIcons from "@/styles/GlobalIcons";
import { Box, Button, Heading, Image, Text, Tooltip } from "@chakra-ui/react";
import Tabs from "@/_ui/tabs/Tabs";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FlexRow from "@/_ui/flex/FlexRow";
import CollectorCard from "@/components/cards/CollectorsCard";
import useMetaList from "@/hooks/meta/useMetasList";
import { useRouter } from "next/router";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import MetaCollectionCard from "@/components/cards/MetaCollectionCard";
import GraphCard from "@/components/cards/GraphCard";
import { exploreModules } from "@/data/studio/constant";
import { getAllTransactions } from "@/service/ApiService";
import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";
import SupportedChains from "@/components/studio/SupportedChains";
import chains from "@/data/network";
import CardNative from "@/_ui/cards/CardNative";
import JSONViewer from "@/_ui/JSONViewer";

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
  const [tab, setTab] = useState<string>("All Details");
  const [selectedOption, setSelectedOption] = useState<any>(options[0].value);
  const hookMetasList = useMetaList();
  const router = useRouter();
  useEffect(() => {
    
    hookMetasList._fetchMore("poap_nft", 9);
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
              <FlexRow hrAlign="flex-start" marginTop={"xl"} flexWrap="wrap">
                {hookMetasList?.metaSchemas?.map((schema: any, index: any) => {
                  console.log(schema, "schema");
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
    return <NavMeta />;
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
