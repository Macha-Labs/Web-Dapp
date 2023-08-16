import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";
import { useEffect, useState } from "react";

import FlexColumn from "@/_ui/flex/FlexColumn";
import NavMeta from "@/_ui/nav/NavMeta";
import NavStudio from "@/_ui/nav/NavStudio";
import MetaCollectionCard from "@/components/cards/MetaCollectionCard";
import useMetaList from "@/hooks/meta/useMetasList";
import useAlchemy from "@/hooks/studio/useAlchemy";
import { Text, Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavLeft from "@/_ui/nav/NavLeft";

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

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs}>
        <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
          <Heading fontSize={style.font.h3} fontWeight={600} className="m-b-0">
            Explore
          </Heading>
        </FlexColumn>
        <FlexRow hrAlign="flex-start" marginTop={"md"} flexWrap="wrap">
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
