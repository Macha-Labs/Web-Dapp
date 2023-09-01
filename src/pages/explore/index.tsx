import { FlexWindow } from "@/_ui/flex/FlexWindow";
import { style } from "@/styles/StyledConstants";

import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import Marquee from "@/components/Marquee/Marquee";
import CollectorCard from "@/components/cards/CollectorsCard";
import GraphCard from "@/components/cards/GraphCard";
import TransactionCard from "@/components/cards/TransactionCard";
import CarouselSlide from "@/components/studio/CarouselSlide";
import SupportedChains from "@/components/studio/SupportedChains";
import chains from "@/data/network";
import { exploreModules } from "@/data/studio/constant";
import useMetaList from "@/hooks/meta/useMetasList";
import useTransaction from "@/hooks/studio/useTransaction";
import GlobalIcons from "@/styles/GlobalIcons";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LeaderboardTable from "@/components/table/LeaderboardTable";

// export async function getServerSideProps() {
//   let allTransactions: any = [];
//   let allMetas: any = [];
//   let allMetaSchemas: any = [];

//   const resAllTransactions = await getAllTransactions();
//   if (resAllTransactions.data) {
//     console.log(resAllTransactions.data, "latest txn");
//     allTransactions = resAllTransactions.data;
//   } else {
//     console.log("Couldnt fetch all transactions");
//   }

//   const resAllMetas = await fetchAllMetas("poap_nft", 1, 9);
//   if (resAllMetas.data) {
//     console.log(resAllMetas.data, "all metass");
//     allMetas = {
//       data: resAllMetas.data,
//       lastPage: resAllMetas.lastPage,
//     };
//   } else {
//     console.log("Couldnt fetch all metas");
//   }

//   const resAllMetaSchemas = await fetchMetaSchemas();
//   if (resAllMetaSchemas.data) {
//     console.log(resAllMetaSchemas.data, "all metas schemas");
//     allMetaSchemas = resAllMetaSchemas.data;
//   } else {
//     console.log("Couldnt fetch all meta schemas");
//   }

//   return {
//     props: {
//       allTransactions: allTransactions,
//       allMetas: allMetas,
//       allMetaSchemas: allMetaSchemas,
//     },
//   };
// }

export default function Home() {
  const hookTransaction = useTransaction();
  const hookMetasList = useMetaList();
  const router = useRouter();

  useEffect(() => {
    hookTransaction._fetchLatestTransactions();
    hookMetasList._fetchMore("poap_nft", 9);
    hookMetasList._fetchMetaSchemas();
    // hookTransaction.setLatestTransactions(allTransactions);
    // hookMetasList.initialLoadAllMetas(allMetas.data, allMetas.lastPage);
    // hookMetasList.initialLoadMetaSchemas(allMetaSchemas);
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
            title="Explore From MACHA"
            description="POSTS • PROFILES • BLOGS"
            avatarImage={GlobalIcons["logo-Macha-circular"]}
            // bgGrid="/assets/explore/lens%20carousal%20bg%20grid.svg"
            bgGrid=""
            bgBlur="/assets/explore/home-carousal-1-hero-bg.svg"
            bannerImage="/assets/explore/home-carousal-1-hero-image.svg"
            buttonText="Explore"
          />
          <CarouselSlide
            title="View From Contracts"
            description="LENS • MIRROR • POAP"
            avatarImage={GlobalIcons["base-SDK"]}
            // bgGrid="/assets/explore/poap%20carousal%20bg%20grid.svg"
            bgGrid=""
            bgBlur="/assets/explore/home-carousal-1-hero-bg.svg"
            bannerImage="/assets/explore/home-carousal-2-hero-image.svg"
            buttonText="View Contracts Now"
          />
          <CarouselSlide
            title="Discover From Chains"
            description="TRANSACTIONS • INDEXING • CHAINS"
            avatarImage={GlobalIcons["base-chain"]}
            // bgGrid="/assets/explore/mirror%20carousal%20bg%20grid.svg"
            bgGrid=""
            bgBlur="/assets/explore/home-carousal-1-hero-bg.svg"
            bannerImage="/assets/explore/home-carousal-3-hero-image.svg"
            buttonText="View Chains"
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
        <Box marginTop={style.margin.xl}>
            <LeaderboardTable />
        </Box>
        <Box marginTop={style.margin.xl}>
          <FlexColumn hrAlign="flex-start " vrAlign="flex-start">
            <Heading
              fontSize={style.font.h3}
              fontWeight={600}
              className="m-b-0"
            >
              Explore Chains
            </Heading>
          </FlexColumn>
          <FlexRow marginTop={"lg"} hrAlign="flex-start" flexWrap="wrap">
            {Object.keys(chains).map((chain: any, index) => {
              // console.log(chains[chain]);
              return (
                <SupportedChains data={chains[chain]} id={chain} key={index} />
              );
            })}
          </FlexRow>
        </Box>
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
