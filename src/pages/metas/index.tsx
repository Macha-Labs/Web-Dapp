import CardNative from "@/_ui/cards/CardNative";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavTop from "@/_ui/nav/NavTop";
import GraphCard from "@/components/cards/GraphCard";
import SupportedChains from "@/components/studio/SupportedChains";
import chains from "@/data/network";
import { exploreModules } from "@/data/studio/constant";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Metas = () => {
  const router = useRouter();
  const hookMetasList = useMetaList();

  useEffect(() => {
    hookMetasList._fetchMetaSchemas();
  }, []);

  const renderBody = () => {
    return (
      <CardNative
        height="fit-content"
        width="100%"
        header={
          <Heading fontSize={style.font.h3} fontWeight={600} className="m-b-0">
            Discover Meta Content
          </Heading>
        }
      >
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
      </CardNative>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={<NavLeft />}
      navTop={<NavMeta />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Metas;
