import CardNative from "@/_ui/cards/CardNative";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import MetaList from "@/components/meta/MetaList";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    return <NavHeader />;
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
      view="col"
      bodyElem={renderBody()}
      navTop={renderNav()}
      // navLeft={<NavLeft />}
    ></FlexWindow>
  );
};

export default Explore;
