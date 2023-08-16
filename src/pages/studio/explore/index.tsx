import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";
import { useEffect, useState } from "react";

import FlexColumn from "@/_ui/flex/FlexColumn";
import NavMeta from "@/_ui/nav/NavMeta";
import NavStudio from "@/_ui/nav/NavStudio";
import ColoredCard from "@/components/cards/ColoredCard";
import useMetaList from "@/hooks/meta/useMetasList";
import useAlchemy from "@/hooks/studio/useAlchemy";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Explore() {
  const hookAlchemy = useAlchemy();
  const router = useRouter();
  const hookMetasList = useMetaList();
  const [exploreMeta, setExploreMeta] = useState<any>([]);
  const [selectedNavTab, setSelectedNavTab] = useState<string>("Your Metas");

  const dashboardNav: any = [
    {
      value: "Studio",
      href: "",
    },
    {
      value: "",
      href: "",
    },
  ];

  // const fetchmetas = async () => {
  //   const allMetas = await fetchAllMetas();
  //   setExploreMeta(allMetas.data);
  // };
  useEffect(() => {
    if (router.isReady) {
      hookMetasList._fetchAll();
      hookMetasList._fetchMetaSchemas();
    }
  }, []);

  // useEffect(() => {
  //   fetchmetas();
  //   hookAlchemy.alchemyData();
  // }, []);

  const renderBody = () => {
    // console.log("exploreMeta", exploreMeta);
    return (
      <>
        {/* <NavBlock>
          <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
            <Tabs
              width="15%"
              options={dashboardNav}
              gstyle={{ fontSize: `${style.font.h5}` }}
              value={selectedNavTab}
              onChange={setSelectedNavTab}
            />
          </FlexRow>
        </NavBlock> */}
        <FlexBody>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Text
              fontSize={"xl"}
              fontWeight={600}
              className="m-b-0"
            >
              Use Module
            </Text>
            <Text>
              Create content like posts, places, products, events and more
              across web3 by choosing one of the module from over 8+ protocols.
            </Text>
          </FlexColumn>
          <FlexRow hrAlign="flex-start" marginTop={"md"} flexWrap="wrap">
            {hookMetasList?.metaSchemas?.map((schema: any, index: any) => {
              console.log(schema, "schema");
              return (
                <ColoredCard
                  key={index}
                  heading={schema.name}
                  // description={schema.description}
                  bg={schema.bg}
                  borderColor={schema.borderColor}
                  onCardClick={() => {
                    router.push(
                      {
                        pathname: `/studio/explore/[id]`,
                        query: {
                          id: schema?.slug,
                        },
                      },
                      `/studio/explore/${schema?.slug}`
                    );
                  }}
                />
              );
            })}
          </FlexRow>
        </FlexBody>
      </>
    );
  };

  const renderNavLeft = () => {
    return <NavMeta />;
  };

  const renderNavTop = () => {
    return <NavStudio />;
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
