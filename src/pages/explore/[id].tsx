import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavStudio from "@/_ui/nav/NavStudio";
import MetaList from "@/components/meta/MetaList";
import { metaSchemaName } from "@/data/studio/constant";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  metaInfo: any;
};

const Explore = () => {
  const router = useRouter();
  const hookMetasList = useMetaList();

  useEffect(() => {
    if (router.isReady) {
      if (window !== undefined) {
        const data = window.sessionStorage.getItem(`${router.query.id}_page`);
        if (data !== null) {
          var newLimit = JSON.parse(data) * 30;
          if (newLimit > 300) newLimit = 300;
          hookMetasList._fetchMore(router.query.id, newLimit);
          hookMetasList.setPageNo(JSON.parse(data));
        } else {
          hookMetasList._fetchMore(router.query.id, 30);
        }
      } else {
        hookMetasList._fetchMore(router.query.id, 30);
      }
    }
  }, [router.query.id]);

  const renderNav = () => {
    return <NavMeta />;
  };

  const renderComponent = () => {
    return <MetaList hookMetasList={hookMetasList} />;
  };

  const renderBody = () => {
    return (
      <>
        <CardNative
          header={
            <>
              <Heading fontSize={style.font.h3}>Discover</Heading>
            </>
          }
        >
          <> {renderComponent()}</>
        </CardNative>
      </>
    );
  };
  return (
    <FlexWindow
      view="both"
      bodyElem={renderBody()}
      navTop={renderNav()}
      navLeft={<NavLeft />}
    ></FlexWindow>
  );
};

export default Explore;
