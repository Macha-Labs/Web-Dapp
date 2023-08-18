import MCard from "@/_sdk/MCard";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import CollectorCard from "@/components/cards/CollectorsCard";
import GraphCard from "@/components/cards/GraphCard";
import SongCard from "@/components/cards/SongCard";
import CarouselSlide from "@/components/studio/CarouselSlide";
import chains from "@/data/network";
import { truncateAddress } from "@/helpers";
import { getLatestTransactions } from "@/service/ApiService";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import IconImage from "@/_ui/icons/IconImage";

const Explorer = () => {
  const [latestTransactions, setLatestTransactions] = useState<any>();

  useEffect(() => {
    getLatestTransactions().then((res) => {
      if (res.data) {
        console.log(res.data, "latest txn");
        setLatestTransactions(res.data);
      } else {
        console.log("Couldnt fetch");
      }
    });
  }, []);

  return (
    <FlexColumn hrAlign="flex-start" width="100%">
      <Box
        paddingX={"4%"}
        width="100%"
        display={"flex"}
        justifyContent={"center"}
        flexDirection="column"
        paddingBottom={style.margin.xxl}
      >
        <Box
          style={{
            width: "100%",
            padding: "2% 0.5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: `${style.font.h5}`,
              fontWeight: `${style.fontWeight.dark}`,
            }}
          >
            Latest Transactions
          </Text>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              overflow: "hidden",
              height: "fit-content",
              padding: "2% 0.5%",
            }}
          >
            {latestTransactions &&
              Object.keys(latestTransactions).map((chain: any) => (
                <GraphCard
                  key={chain}
                  image={GlobalIcons[chains[chain].chainImage]}
                  user={truncateAddress(
                    latestTransactions[chain]?.transaction?.from
                  )}
                  title={truncateAddress(
                    latestTransactions[chain]?.transaction?.to
                  )}
                  tag={truncateAddress(
                    latestTransactions[chain]?.transaction?.txn_hash
                  )}
                />
              ))}
          </Box>
        </Box>
        <Box
          style={{
            width: "100%",
            padding: "2% 0.5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: `${style.font.h5}`,
              fontWeight: `${style.fontWeight.dark}`,
            }}
          >
            Discover new music and prove you were there first
          </Text>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <GraphCard
              image="/assets/nofollow.png"
              title="premia-mainnet"
              user="premia.eth"
              tag="SIGNAL: 199.0K GRT"
            />
            <GraphCard
              image="/assets/iconImages/OpenSea.png"
              title="premia-mainnet"
              user="premia.eth"
              tag="SIGNAL: 199.0K GRT"
            />
            <GraphCard
              image="/assets/iconImages/MetaMask.png"
              title="premia-mainnet"
              user="premia.eth"
              tag="SIGNAL: 199.0K GRT"
            />
            <GraphCard
              image="/assets/iconImages/Lighthouse.png"
              title="premia-mainnet"
              user="premia.eth"
              tag="SIGNAL: 199.0K GRT"
            />
            <GraphCard
              image="/assets/iconImages/Superfluid.png"
              title="premia-mainnet"
              user="premia.eth"
              tag="SIGNAL: 199.0K GRT"
            />
          </Box>
        </Box>
        <Box
          style={{
            width: "100%",
            padding: "2% 0.5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: `${style.font.h5}`,
              fontWeight: `${style.fontWeight.dark}`,
            }}
          >
            Discover new music and prove you were there first
          </Text>
          {/* <ImageCarousal /> */}
          <Carousel
            autoPlay
            // showIndicators={false}
            showArrows={false}
            showStatus={false}
            infiniteLoop
            interval={2500}
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
        </Box>
        <FlexRow vrAlign="center" hrAlign="space-between" marginBottom="sm">
          <Text
            style={{
              fontSize: `${style.font.h5}`,
              fontWeight: `${style.fontWeight.dark}`,
            }}
          >
            Viral Sounds This Week
          </Text>
          <ButtonNative
            size="sm"
            text="See All"
            variant="state_brand"
            marginRight="0px"
            paddingLeft="sm"
            paddingRight="sm"
            height="1.5rem"
            marginBottom="0px"
          />
        </FlexRow>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <SongCard
            title="Daniel Allan & bloody white - Duality [VIP]"
            artist="Family Affair"
            tag="1,931 mints"
          />
          <SongCard
            title="Daniel Allan & bloody white - Duality [VIP]"
            artist="Family Affair"
            tag="1,931 mints"
          />
          <SongCard
            title="Daniel Allan & bloody white - Duality [VIP]"
            artist="Family Affair"
            tag="1,931 mints"
          />
          <SongCard
            title="Daniel Allan & bloody white - Duality [VIP]"
            artist="Family Affair"
            tag="1,931 mints"
          />
          <SongCard
            title="Daniel Allan & bloody white - Duality [VIP]"
            artist="Family Affair"
            tag="1,931 mints"
          />
          <SongCard
            title="Daniel Allan & bloody white - Duality [VIP]"
            artist="Family Affair"
            tag="1,931 mints"
          />
        </Box>
        <Box
          style={{
            width: "100%",
            padding: "2% 0.5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FlexRow vrAlign="center" hrAlign="space-between" marginBottom="sm">
            <Text
              style={{
                fontSize: `${style.font.h5}`,
                fontWeight: `${style.fontWeight.dark}`,
              }}
            >
              New Metas
            </Text>
            <ButtonNative
              size="sm"
              text="See All"
              variant="state_brand"
              marginRight="0px"
              paddingLeft="sm"
              paddingRight="sm"
              height="1.5rem"
              marginBottom="0px"
            />
          </FlexRow>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "auto",
            }}
          >
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
          </Box>
        </Box>
        <FlexRow vrAlign="center" hrAlign="space-between" marginBottom="sm">
          <Text
            style={{
              fontSize: `${style.font.h5}`,
              fontWeight: `${style.fontWeight.dark}`,
            }}
          >
            Top Collectors This Week
          </Text>
          <ButtonNative
            size="sm"
            text="See All"
            variant="state_brand"
            marginRight="0px"
            paddingLeft="sm"
            paddingRight="sm"
            height="1.5rem"
            marginBottom="0px"
          />
        </FlexRow>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
          <CollectorCard
            name="LONG CHIM | UNWA"
            tag="358 mints"
            artists="7 artists backed"
          />
        </Box>
        <Box
          style={{
            width: "100%",
            padding: "2% 0.5%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FlexRow vrAlign="center" hrAlign="space-between" paddingBottom="sm">
            <Text
              style={{
                fontSize: `${style.font.h5}`,
                fontWeight: `${style.fontWeight.dark}`,
              }}
            >
              New Metas
            </Text>
            <ButtonNative
              size="sm"
              text="See All"
              variant="state_brand"
              marginRight="0px"
              paddingLeft="sm"
              paddingRight="sm"
              height="1.5rem"
              marginBottom="0px"
            />
          </FlexRow>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "auto",
            }}
          >
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "auto",
            }}
          >
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
            <MCard
              title="Rock"
              image={GlobalIcons["logo-Ethereum"]}
              width="40%"
              description={"lorem ipsum"}
            />
          </Box>
          <FlexRow>
            <ButtonNative
              size="sm"
              text="See All"
              variant="state_brand"
              marginRight="0px"
              paddingLeft="sm"
              paddingRight="sm"
              height="2rem"
              marginBottom="0px"
            />
          </FlexRow>
          <Box
            background={style.card.bg.brand}
            borderRadius={style.card.borderRadius.default}
            padding={style.padding.lg}
            marginTop={style.margin.xxl}
          >
            <Box width="50%">
              <Heading
                fontSize={style.font.h3}
                p={0}
                lineHeight={style.font.h3}
              >
                Explore the future of Search
              </Heading>
              <Text fontSize={style.font.h5} mb={0}>
                Join the revolution by exploring the on chain transactions of
                contracts like Poap, Lens, ENS.
              </Text>
              <Text fontSize={style.font.h5}>
                Supported chains like Polygon, Ethereum, Optimism and many more.
              </Text>
              <Box display={"flex"}>
                <ButtonNative
                  textColorHover="#004ad9"
                  size="lg"
                  boxShadowHover="4px 4px 24px rgba(0,0,0,0.35)"
                  backgroundColorHover="#A0CDFF"
                  border="1px solid #fff"
                  marginTop="xs"
                  text="Become a Publisher"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </FlexColumn>
  );
};

export default Explorer;
