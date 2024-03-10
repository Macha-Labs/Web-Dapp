import CardNative from "@/_ui/cards/CardNative";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import GraphCard from "@/components/cards/GraphCard";
import { exploreModules } from "@/data/studio/constant";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Heading, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Metas = () => {
  const router = useRouter();
  const hookMetasList = useMetaList();
  const { colorMode } = useColorMode();
  useEffect(() => {
    hookMetasList._fetchMetaSchemas();
  }, []);

  const renderBody = () => {
    return (
      <CardNative
        height="fit-content"
        width="100%"
        header={
          <Heading
            fontSize={style.font.h3}
            fontWeight={600}
            className="m-b-0"
            color={colorMode == "light" ? "black" : ""}
          >
            Discover Metas
          </Heading>
        }
      >
        <FlexRow hrAlign="flex-start" marginTop={"xl"} flexWrap="wrap">
          {hookMetasList?.metaSchemas?.map((schema: any, index: any) => {
            //console.log(schema, "schema");
            return (
              schema?.slug != "mirror_blogs" &&
              schema?.slug != "layer3_quests" &&
              schema?.slug != "lens_profile_polygon" && (
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
              )
            );
          })}
        </FlexRow>
      </CardNative>
    );
  };

  return (
    <FlexWindow
      view="col"
      // navLeft={<NavLeft />}
      navTop={<NavHeader />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Metas;
