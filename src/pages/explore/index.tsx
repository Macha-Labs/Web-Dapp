import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";
import { useEffect, useState } from "react";

import FlexColumn from "@/_ui/flex/FlexColumn";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import MetaCollectionCard from "@/components/cards/MetaCollectionCard";
import ContractList from "@/components/studio/ContractList";
import SupportedChains from "@/components/studio/SupportedChains";
import chains from "@/data/network";
import useMetaList from "@/hooks/meta/useMetasList";
import useAlchemy from "@/hooks/studio/useAlchemy";
import useContractList from "@/hooks/studio/useContractList";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Explore() {
  const hookAlchemy = useAlchemy();
  const router = useRouter();
  const hookMetasList = useMetaList();
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Your Metas");
  const hookContractList = useContractList();

  useEffect(() => {
    if (router.isReady) {
      hookMetasList._fetchMore();
      hookMetasList._fetchMetaSchemas();
    }
  }, []);

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs}>
        <Box>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Heading
              fontSize={style.font.h3}
              fontWeight={600}
              className="m-b-0"
            >
              Discover Meta Content
            </Heading>
          </FlexColumn>
          <FlexRow hrAlign="flex-start" marginTop={"xl"} flexWrap="wrap">
            {hookMetasList?.metaSchemas?.map((schema: any, index: any) => {
              console.log(schema, "schema");
              return (
                <MetaCollectionCard
                  key={index}
                  heading={schema.name}
                  tag1={schema.slug}
                  tag2={schema.contract_slug}
                  // description={schema.description}
                  bg={schema.bg}
                  borderColor={schema.borderColor}
                  onCardClick={() => {
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
        </Box>
        <Box marginTop={style.margin.xxxl}>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Heading
              fontSize={style.font.h3}
              fontWeight={600}
              className="m-b-0"
            >
              Explore Chains
            </Heading>
          </FlexColumn>
          <FlexRow marginTop={"lg"} hrAlign="flex-start" flexWrap="wrap">
            {Object.keys(chains).map((chain: any, index) => {
              // console.log(chains[chain]);
              return (
                <SupportedChains data={chains[chain]} id={chain} key={index} />
              );
            })}
          </FlexRow>
        </Box>

        <Box marginTop={style.margin.xxxl}>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Heading
              fontSize={style.font.h3}
              fontWeight={600}
              className="m-b-0"
            >
              Indexing Contracts
            </Heading>
          </FlexColumn>
          <FlexRow hrAlign="flex-start" marginTop={"xl"} flexWrap="wrap">
            <ContractList data={hookContractList.filterData} />
          </FlexRow>
        </Box>
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
