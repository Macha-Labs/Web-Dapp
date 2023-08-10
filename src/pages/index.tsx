import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavMeta from "@/_ui/nav/NavMeta";
import TagNative from "@/_ui/tag/TagNative";
import useMetaList from "@/hooks/meta/useMetasList";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Explorer = () => {
  const hookMetasList = useMetaList();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    if (router.isReady) {
      hookMetasList._fetchAll();
    }
  }, []);

  const renderNav = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <FlexColumn hrAlign="flex-start">
        <Box style={{
          display: "flex",
          paddingTop: `${style.margin.nav}`,
          justifyContent: "flex-start",
          paddingLeft: "7%",
          paddingRight: "7%",
          width: "90%"
        }}>
          <TagNative icon={{align:"left",slug: ""}} value="All"  lineHeight="1.25rem" />
          <TagNative icon={{align:"left",slug: "logo-Lens"}} value="Lens"  lineHeight="1.25rem" />
          <TagNative icon={{align:"left",slug: "logo-Ens"}} value="ENS" lineHeight="1.25rem"  />
        </Box>
        <Box
          paddingTop={style.margin["lg"]}
          paddingX={"6%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <FlexRow flexWrap={"wrap"} width="90%" vrAlign="flex-start">
            {hookMetasList?.metaAll &&
              hookMetasList?.metaAll?.map((item: any, index: any) => {
                return (
                  <MCard
                    title={item?.meta?.data?.modified?.meta_title}
                    key={index}
                    image={item?.meta?.data?.modified?.meta_image}
                    width="30%"
                    description={item?.meta?.data?.modified?.meta_description}
                    onClick={() => {
                      router.push(`/search/meta/${item?._id}`);
                    }}
                  />
                );
              })}
          </FlexRow>
          <Box
            style={{
              position: "fixed",
              bottom: "10px",
              zIndex: "1000",
              background: `${style.nav.bg.meta}`,
              borderRadius: `${style.card.borderRadius.default}`,
              border: `${style.card.border.default}`,
              display: `${!isOpen && "none"}`
              // width: "50%",
            }}
          >
            <Box style={{
              padding: `${style.padding.xs}`,
              position: "relative"
            }}>
              <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
                <Box style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  zIndex: "100",
                  border: `${style.card.border.meta}`,
                  borderRadius: "100px",
                  padding: "1px",
                  background: `${style.nav.bg.meta}`,
                  cursor: "pointer"
                }}
                  onClick={() => setIsOpen(false)}
                >
                  <Image src={GlobalIcons["icon-close"]} alt="" height="0.75rem" />
                </Box>
                <Text fontSize={style.font.h5} mb={0} marginRight={style.margin.sm} fontWeight={style.fontWeight.dark}>
                  Explore Macha Studio our latest Innovation for developers
                </Text>
                <ButtonNative
                  variant="state_brand"
                  onClick={() => router.push('/studio')}
                  height="2rem"
                >
                  Explore
                </ButtonNative>
              </FlexRow>
            </Box>
          </Box>
        </Box>
      </FlexColumn>
    );
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Explorer;
