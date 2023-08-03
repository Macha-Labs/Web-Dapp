import MCard from "@/_sdk/MCard";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavMeta from "@/_ui/nav/NavMeta";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Explorer = () => {
  const hookMetasList = useMetaList();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      hookMetasList._fetch("lens_post");
    }
  }, []);

  const renderNav = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <Box
        paddingTop={style.margin["nav"]}
        paddingX={"6%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <FlexRow flexWrap={"wrap"} width="90%" vrAlign="flex-start">
          {hookMetasList.metaList &&
            hookMetasList.metaList.map((item: any, index: any) => {
              return (
                <MCard
                  key={index}
                  image={item?.meta?.data?.modified?.meta_media}
                  width="30%"
                  description={item?.meta?.data?.modified?.meta_description}
                  onClick={() => {
                    router.push(`/search/meta/${item?._id}`);
                  }}
                />
              );
            })}
        </FlexRow>
      </Box>
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
