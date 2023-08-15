import MCard from "@/_sdk/MCard";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavBlock from "@/_ui/nav/NavBlock";
import NavStudio from "@/_ui/nav/NavStudio";
import useMetaList from "@/hooks/meta/useMetasList";
import { style } from "@/styles/StyledConstants";
import { Box, Heading } from "@chakra-ui/react";
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
      hookMetasList._fetchAll(router.query.id);
    }
  }, [router.query.id]);

  const renderNav = () => {
    return <NavStudio />;
  };

  const renderComponent = () => {
    return (
      <Box paddingTop="10rem">
        <FlexRow flexWrap={"wrap"} width="100%" vrAlign="flex-start">
          {hookMetasList.isLoading && (
            <>
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
              <CardSkeleton width="30%" />
            </>
          )}
          {!hookMetasList.isLoading &&
            hookMetasList?.metaAll &&
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
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <>
        <>
          {" "}
          <NavBlock
            back={() => {
              router.back();
            }}
            marginTop={style.margin["nav"]}
          >
            <FlexRow width="100%" vrAlign="center" hrAlign="space-between">
              <FlexRow width="100%" hrAlign="space-between">
                <Heading fontSize={style.font.h5} className="m-b-0">
                  {"Meta schema"}
                </Heading>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                ></Box>
              </FlexRow>
              {/* <Tabs
              width="40%"
              options={options}
              value={selectedTab}
              onChange={(value: any) => setSelectedTab(value)}
              gstyle={{ fontSize: `${style.font.h5}` }}
            /> */}
            </FlexRow>
          </NavBlock>
          <FlexBody>{renderComponent()}</FlexBody>
        </>
      </>
    );
  };
  return (
    <FlexWindow
      view="col"
      bodyElem={renderBody()}
      navElem={renderNav()}
    ></FlexWindow>
  );
};

export default Explore;
