import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import MotionBar from "@/components/MotionBar";
import MetaList from "@/components/meta/MetaList";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Box, Heading } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Explorer = () => {
  const hookMetasList = useMetaList();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (window !== undefined) {
        const data = window.sessionStorage.getItem(`all_metas_page`);
        if (data !== null) {
          var newLimit = JSON.parse(data) * 30;
          if (newLimit > 300) newLimit = 300;
          hookMetasList._fetchMore(null, newLimit);
        } else {
          hookMetasList._fetchMore(null, 30);
        }
      } else {
        hookMetasList._fetchMore(null, 30);
      }
    }
  }, []);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta />;
  };

  const renderBody = () => {
    return (
      <CardNative
        header={
          <>
            <Heading fontSize={style.font.h3}>Discover On Web3</Heading>
          </>
        }
      >
        <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
          <Box
            // paddingTop={style.margin["lg"]}
            paddingTop={style.margin.navBoth}
            display={"flex"}
            justifyContent={"center"}
            width="100%"
          >
            <MetaList hookMetasList={hookMetasList} />
            <MotionBar />
          </Box>
        </FlexColumn>
      </CardNative>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={renderNavLeft()}
      navTop={renderNavTop()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Explorer;
