import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";

import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import Marquee from "@/components/Marquee/Marquee";
import TransactionCard from "@/components/cards/TransactionCard";
import CarouselSlide from "@/components/studio/CarouselSlide";
import useTransaction from "@/hooks/studio/useTransaction";
import GlobalIcons from "@/styles/GlobalIcons";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FlexRow from "@/_ui/flex/FlexRow";
import CollectorCard from "@/components/cards/CollectorsCard";
import useMetaList from "@/hooks/meta/useMetasList";
import { useRouter } from "next/router";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import MetaCollectionCard from "@/components/cards/MetaCollectionCard";
import GraphCard from "@/components/cards/GraphCard";
import { exploreModules } from "@/data/studio/constant";
import { getAllTransactions } from "@/service/ApiService";
import { fetchAllMetas, fetchMetaSchemas } from "@/service/MetaService";

export async function getServerSideProps() {
  let allTransactions: any = []
  let allMetas: any = []
  let allMetaSchemas: any = []

  const resAllTransactions = await getAllTransactions()
  if (resAllTransactions.data) {
    console.log(resAllTransactions.data, "latest txn");
    allTransactions = resAllTransactions.data
  } else {
    console.log("Couldnt fetch all transactions");
  }

  const resAllMetas = await fetchAllMetas("poap_nft", 1, 9)
  if (resAllMetas.data) {
    console.log(resAllMetas.data, "all metass");
    allMetas = {
      data: resAllMetas.data,
      lastPage: resAllMetas.lastPage
    }
  } else {
    console.log("Couldnt fetch all metas");
  }

  const resAllMetaSchemas = await fetchMetaSchemas()
  if (resAllMetaSchemas.data) {
    console.log(resAllMetaSchemas.data, "all metas schemas");
    allMetaSchemas = resAllMetaSchemas.data
  } else {
    console.log("Couldnt fetch all meta schemas");
  }

  return {
    props: {
      allTransactions: allTransactions,
      allMetas: allMetas,
      allMetaSchemas: allMetaSchemas
    }
  }
}

export default function Home({ allTransactions,allMetas,allMetaSchemas }: any) {
  const hookTransaction = useTransaction();
  const hookMetasList = useMetaList();
  const router = useRouter();

  useEffect(() => {
    hookTransaction.setLatestTransactions(allTransactions)
    hookMetasList.initialLoadAllMetas(allMetas.data,allMetas.lastPage)
    hookMetasList.initialLoadMetaSchemas(allMetaSchemas)
  }, []);

  const renderBody = () => {
    return (
      <Box paddingX={style.padding.xxs} marginBottom={style.margin.nav}>
        <Carousel
          autoPlay
          // showIndicators={false}
          showArrows={false}
          showStatus={false}
          stopOnHover={true}
          infiniteLoop
          interval={3000}
        // renderArrowPrev={(onClickHandler, hasPrev) =>
        //   hasPrev && (
        //     <Box
        //       style={{
        //         position: "absolute",
        //         zIndex: 2,
        //         top: "calc(50% - 15px)",
        //         cursor: "pointer",
        //         left: "15px"
        //       }}
        //       onClick={onClickHandler}
        //     >
        //       <IconImage
        //         slug="icon-chevron"
        //         size="sm"
        //       />
        //     </Box>
        //   )
        // }
        // renderArrowNext={(onClickHandler, hasNext) =>
        //   hasNext && (
        //     <Box
        //       style={{
        //         position: "absolute",
        //         zIndex: 2,
        //         top: "calc(50% - 15px)",
        //         cursor: "pointer",
        //         right: "15px"
        //       }}
        //       onClick={onClickHandler}
        //     >
        //       <IconImage
        //         slug="icon-chevron-next"
        //         size="sm"
        //       />
        //     </Box>
        //   )
        // }
        >
          <CarouselSlide
            title="LENS"
            description="POSTS • PROFILES • CHATS"
            avatarImage={GlobalIcons["logo-Lens"]}
            bgGrid="/assets/explore/lens%20carousal%20bg%20grid.svg"
            bgBlur="/assets/explore/lens%20carousal%20bg%20blur.svg"
            bannerImage="/assets/explore/lens%20carousal%20right%20full%20image.svg"
          />
          <CarouselSlide
            title="POAP"
            description="MINT • DROP • CONNECT"
            avatarImage={GlobalIcons["logo-Poap"]}
            bgGrid="/assets/explore/poap%20carousal%20bg%20grid.svg"
            bgBlur="/assets/explore/lens%20carousal%20bg%20blur.svg"
            bannerImage="/assets/explore/poap%20carousal%20right%20full%20image.svg"
          />
          <CarouselSlide
            title="MIRROR"
            description="BLOGS • NFTs • MINT"
            avatarImage={GlobalIcons["logo-Mirror"]}
            bgGrid="/assets/explore/mirror%20carousal%20bg%20grid.svg"
            bgBlur="/assets/explore/lens%20carousal%20bg%20blur.svg"
            bannerImage="/assets/explore/mirror%20carousal%20right%20full%20image.svg"
          />
        </Carousel>
        {hookTransaction.latestTransactions && (
          <Marquee
            speed={50000}
            body={
              <>
                {hookTransaction.latestTransactions.map((transaction: any) => (
                  <TransactionCard
                    key={transaction._id}
                    from={transaction.transaction.from}
                    to={transaction?.transaction?.to}
                    chain_id={transaction?.transaction?.chain_id}
                    method_name={transaction?.transaction?.method_name}
                    timestamp={transaction?.timestamp}
                    txn_hash={transaction?.transaction?.txn_hash}
                  />
                ))}
              </>
            }
          ></Marquee>
        )}
        <Box>
          <FlexColumn
            hrAlign="flex-start "
            vrAlign="flex-start"
            marginTop={"4xl"}
          >
            <Heading
              fontSize={style.font.h3}
              fontWeight={600}
              className="m-b-0"
            >
              Discover Meta Content
            </Heading>
          </FlexColumn>
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
        </Box>
        <FlexRow marginTop={"4xl"} hrAlign="space-between">
          <Heading mb="0px" fontSize={style.font.h3} fontWeight={600}>
            Latest POAP indexed
          </Heading>
          <ButtonNative
            height="2rem"
            text="see all"
            marginRight="0px"
            variant="state_brand"
            onClick={() => {
              router.push("/explore/poap_nft");
            }}
          />
        </FlexRow>
        <FlexRow flexWrap={"wrap"} hrAlign="flex-start">
          {!hookMetasList.isLoading &&
            hookMetasList?.metaAll &&
            hookMetasList?.metaAll?.map((item: any, index: any) => {
              console.log(item, "item");
              return (
                <CollectorCard
                  name={item?.meta?.data?.modified?.meta_title}
                  key={index}
                  image={item?.meta?.data?.modified?.meta_image}
                  //   image={item?.meta?.data?.modified?.meta_image}
                  //   slug={item?.meta_schema?.name}
                  width="31%"
                  tag={item?.meta?.data?.modified?.meta_description}
                  //   artists="7 artists backed"
                  //   description={item?.meta?.data?.modified?.meta_description}
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
