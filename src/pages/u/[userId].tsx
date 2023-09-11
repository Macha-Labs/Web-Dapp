import ButtonNative from "@/_ui/buttons/ButtonNative";
import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import AssetCard from "@/components/cards/AssetCard";
import NftCard from "@/components/cards/NftCard";
import MetaUserList from "@/components/meta/MetaUserList";
import CarouselSlide from "@/components/studio/CarouselSlide";
import UserAssetsModal from "@/components/studio/UserAssetsModal";
import UserXPModal from "@/components/studio/UserXPModal";
import { config } from "@/config";
import chains from "@/data/network";
import { truncateAddress } from "@/helpers";
import useAlchemy from "@/hooks/studio/useAlchemy";
import useUserMeta from "@/hooks/studio/useUserMeta";
import useXP from "@/hooks/studio/useXP";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useAccount } from "wagmi";

const User = () => {
  const hookAlchemy = useAlchemy();
  const userAssetsModal = useDisclosure();
  const userXPModal = useDisclosure();
  const router = useRouter();
  const tokenModal = useDisclosure();
  // checks whether the searched user address has Macha NFT
  const [hasNft, setHasNft] = useState<boolean>(false);
  // checks whether the user searched and our address is same or not
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { address } = useAccount();
  const hookXP = useXP();

  useEffect(() => {
    const fetch = async () => {
      hookXP._fetchUserXP(router.query.userId);
      await hookAlchemy.getNftsByAddress(router.query.userId, chains);
      if (
        router.query.userId &&
        router.query.userId.toString().toLowerCase() == address?.toLowerCase()
      ) {
        setIsOwner(true);
      }
    };
    if (router.isReady) {
      fetch();
    }
  }, [router.query.userId, address]);

  useEffect(() => {
    console.log("get Nft by address", hookAlchemy.nftByAddress);
    if (hookAlchemy.nftByAddress && hookAlchemy.nftByAddress[0]) {
      hookAlchemy.nftByAddress.map((nft: any) => {
        if (
          nft.contract.address.toLowerCase() ==
          config.MACHA_CALIBRATION_SBT_CONTRACT_ADDRESS.toLowerCase() ||
          nft.contract.address.toLowerCase() ==
          config.MACHA_GOERLI_SBT_CONTRACT_ADDRESS.toLowerCase() ||
          nft.contract.address.toLowerCase() ==
          config.MACHA_MUMBAI_SBT_CONTRACT_ADDRESS.toLowerCase()
        ) {
          setHasNft(true);
        }
      });
    }
  }, [hookAlchemy.nftByAddress, router.query.userId]);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const UserInfo = () => {
    const userAddress = router.query.userId;
    const { colorMode } = useColorMode()

    return (
      <>
        {isOwner ? (
          !hookAlchemy.isLoading ? (
            <>
              {hasNft ? (
                <>
                  <Box
                    borderRadius={style.card.borderRadius.default}
                    background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
                    border={style.card.border.card}
                  >
                    <FlexColumn>
                      <Box
                        height="15rem"
                        width={"100%"}
                        background={`-webkit-linear-gradient(
                          120deg,
                          #74B2F9,
                          #0629A6
                        )`}
                        borderTopRadius={style.card.borderRadius.default}
                      ></Box>
                      <FlexRow
                        hrAlign="space-between"
                        paddingLeft="xl"
                        paddingRight="xl"
                        paddingTop="md"
                        paddingBottom="md"
                      >
                        <FlexRow width="fit-content">
                          <Image
                            src={GlobalIcons["avatar-default"]}
                            height={"4rem"}
                            width={"4rem"}
                            objectFit={"cover"}
                            alt="avatar-default"
                          />
                          <Text
                            color={colorMode == "light" ? "#000" : ""}
                            fontSize={`${style.font.h4}`}
                            mb={0}
                            marginLeft={style.margin.xxs}
                          >
                            {truncateAddress(userAddress)}
                          </Text>
                        </FlexRow>
                        <Box
                          display={"flex"}
                          justifyContent="flex-end"
                          width="25%"
                        >
                          {/* {hookXP?.userXPList?.claims?.map(
                            (reward: any, index: any) => (
                              <Box
                                key={index}
                                borderRadius={"50%"}
                                paddingX={style.padding.xxs}
                              >
                                <Image
                                  src={
                                    GlobalIcons[
                                      chains[reward?.chainId]?.chainImage
                                    ]
                                  }
                                  height={"2rem"}
                                  width={"2rem"}
                                  alt=""
                                />
                              </Box>
                            )
                          )} */}
                        </Box>
                      </FlexRow>
                    </FlexColumn>
                  </Box>
                  <FlexRow marginTop="xxl" hrAlign="space-between">
                    <Box width="55%" marginRight="10px">
                      <Flex marginTop={`${style.margin.lg}`}>
                        <AssetCard
                          title={hookXP?.userXPList?.xps_earned}
                          description="XPs"
                          icon="/assets/icons/brand-bolt.svg"
                          onClick={() => {
                            if (isOwner) {
                              userXPModal.onOpen();
                            }
                          }}
                        />
                      </Flex>
                    </Box>
                    <Box width="45%">
                      <Box
                        flex="1"
                        height={"20rem"}
                        marginTop={`${style.margin.lg}`}
                        borderRadius={style.card.borderRadius.default}
                        border={style.card.border.card}
                        overflow="hidden"
                      >
                        <Carousel
                          autoPlay
                          // showIndicators={false}
                          showArrows={false}
                          showStatus={false}
                          stopOnHover={true}
                          showThumbs={false}
                          infiniteLoop
                          interval={3000}
                        >
                          <CarouselSlide
                            height="20rem"
                            title="Explore From MACHA"
                            description="POSTS • PROFILES • BLOGS"
                            headingFontSize={style.font.h6}
                            descriptionFontSize={style.font.h7}
                            avatarImage={GlobalIcons["logo-Macha-circular"]}
                            // bgGrid="/assets/explore/lens%20carousal%20bg%20grid.svg"
                            bgGrid=""
                            bgBlur="/assets/explore/home-carousal-1-hero-bg.svg"
                            bannerImage="/assets/explore/home-carousal-1-hero-image.svg"
                            buttonText="Explore"
                          />
                          <CarouselSlide
                            height="20rem"
                            title="View From Contracts"
                            description="LENS • MIRROR • POAP"
                            headingFontSize={style.font.h6}
                            descriptionFontSize={style.font.h7}
                            avatarImage={GlobalIcons["base-SDK"]}
                            // bgGrid="/assets/explore/poap%20carousal%20bg%20grid.svg"
                            bgGrid=""
                            bgBlur="/assets/explore/home-carousal-1-hero-bg.svg"
                            bannerImage="/assets/explore/home-carousal-2-hero-image.svg"
                            buttonText="View Contracts Now"
                          />
                          <CarouselSlide
                            height="20rem"
                            title="Discover From Chains"
                            headingFontSize={style.font.h6}
                            descriptionFontSize={style.font.h7}
                            description="TRANSACTIONS • INDEXING • CHAINS"
                            avatarImage={GlobalIcons["base-chain"]}
                            // bgGrid="/assets/explore/mirror%20carousal%20bg%20grid.svg"
                            bgGrid=""
                            bgBlur="/assets/explore/home-carousal-1-hero-bg.svg"
                            bannerImage="/assets/explore/home-carousal-3-hero-image.svg"
                            buttonText="View Chains"
                          />
                        </Carousel>
                      </Box>
                    </Box>
                  </FlexRow>

                  <FlexColumn vrAlign="flex-start">
                    <CardNative
                      marginTop="xxl"
                      header={
                        <>
                          <FlexRow hrAlign="space-between">
                            <Heading
                              color={colorMode == "light" ? "#000" : ""}
                              fontSize={`${style.font.h3}`}
                              fontWeight={`${style.fontWeight.dark}`}
                              marginBottom={"0px"}
                            >
                              Feed
                            </Heading>
                            <InputSearch
                              width="25%"
                              height="40px"
                              placeholder="Search Meta"
                            />
                          </FlexRow>
                        </>
                      }
                    >
                      <MetaUserList hookData={useUserMeta} />
                    </CardNative>
                  </FlexColumn>

                  <UserAssetsModal modal={userAssetsModal} />
                  <UserXPModal modal={userXPModal} />
                  {/* <TokenModal modal={tokenModal} hookAlchemy={hookAlchemy} /> */}
                </>
              ) : (
                <NftCard
                  heading="Macha NFT"
                  image="/assets/No_NFT_Claimed_Right.png"
                />
              )}
            </>
          ) : (
            <FlexColumn>
              <Loader size="lg" />
            </FlexColumn>
          )
        ) : // {hasNft ? Box : No user found}
          !hookAlchemy.isLoading ? (
            <>
              {hasNft ? (
                <>
                  <Box
                    borderRadius={style.card.borderRadius.default}
                    background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
                    border={style.card.border.card}
                  >
                    <FlexColumn>
                      <Box
                        height="15rem"
                        width={"100%"}
                        background={`-webkit-linear-gradient(
                          120deg,
                          #74B2F9,
                          #0629A6
                        )`}
                        borderTopRadius={style.card.borderRadius.default}
                      ></Box>
                      <FlexRow
                        hrAlign="space-between"
                        paddingLeft="xl"
                        paddingRight="xl"
                        paddingTop="md"
                        paddingBottom="md"
                      >
                        <FlexRow width="fit-content">
                          <Image
                            src={GlobalIcons["avatar-default"]}
                            height={"4rem"}
                            width={"4rem"}
                            objectFit={"cover"}
                            alt="avatar-default"
                          />
                          <Text
                            color={colorMode == "light" ? "#000" : ""}
                            fontSize={`${style.font.h4}`}
                            mb={0}
                            marginLeft={style.margin.xxs}
                          >
                            {truncateAddress(userAddress)}
                          </Text>
                        </FlexRow>
                        <Box
                          display={"flex"}
                          justifyContent="flex-end"
                          width="25%"
                        >
                          {/* {hookXP?.userXPList?.claims?.map(
                          (reward: any, index: any) => (
                            <Box
                              key={index}
                              borderRadius={"50%"}
                              paddingX={style.padding.xxs}
                            >
                              <Image
                                src={
                                  GlobalIcons[
                                    chains[reward?.chainId]?.chainImage
                                  ]
                                }
                                height={"2rem"}
                                width={"2rem"}
                                alt=""
                              />
                            </Box>
                          )
                        )} */}
                        </Box>
                      </FlexRow>
                    </FlexColumn>
                  </Box>
                  <FlexRow marginTop="xxl" hrAlign="space-between">
                    <Box width="55%" marginRight="10px">
                      <Flex marginTop={`${style.margin.lg}`}>
                        {/* <AssetCard
                          title={String(hookAlchemy.nftByAddress.length)}
                          description="Tokens"
                          icon="/assets/icons/brand-token.svg"
                          onClick={() => {
                            tokenModal.onOpen();
                          }}
                        /> */}
                        {/* <UserAssetCard
                  title="7"
                  description="Domains"
                  icon="/assets/icons/brand-globe.svg"
                /> */}
                        <AssetCard
                          title={hookXP?.userXPList?.xps_earned}
                          description="XPs"
                          icon="/assets/icons/brand-bolt.svg"
                          onClick={() => {
                            if (isOwner) {
                              userXPModal.onOpen();
                            }
                          }}
                        />
                      </Flex>
                    </Box>
                    <Box width="45%">
                      {/* <Heading
                fontSize={`${style.font.h3}`}
                fontWeight={`${style.fontWeight.dark}`}
              >
                Recommations
              </Heading> */}
                      <Box
                        flex="1"
                        height={"20rem"}
                        marginTop={`${style.margin.lg}`}
                        borderRadius={style.card.borderRadius.default}
                        border={style.card.border.card}
                        overflow="hidden"
                      >
                        <Carousel
                          autoPlay
                          // showIndicators={false}
                          showArrows={false}
                          showStatus={false}
                          stopOnHover={true}
                          showThumbs={false}
                          infiniteLoop
                          interval={3000}
                        >
                          <CarouselSlide
                            height="20rem"
                            title="Explore From MACHA"
                            description="POSTS • PROFILES • BLOGS"
                            headingFontSize={style.font.h6}
                            descriptionFontSize={style.font.h7}
                            avatarImage={GlobalIcons["logo-Macha-circular"]}
                            // bgGrid="/assets/explore/lens%20carousal%20bg%20grid.svg"
                            bgGrid=""
                            bgBlur={colorMode == "light" ? "/assets/explore/home_carousal_hero_bg_light.svg" : "/assets/explore/home-carousal-1-hero-bg.svg"}
                            bannerImage="/assets/explore/home-carousal-1-hero-image.svg"
                            buttonText="Explore"
                          />
                          <CarouselSlide
                            height="20rem"
                            title="View From Contracts"
                            description="LENS • MIRROR • POAP"
                            headingFontSize={style.font.h6}
                            descriptionFontSize={style.font.h7}
                            avatarImage={GlobalIcons["base-SDK"]}
                            // bgGrid="/assets/explore/poap%20carousal%20bg%20grid.svg"
                            bgGrid=""
                            bgBlur={colorMode == "light" ? "/assets/explore/home_carousal_hero_bg_light.svg" : "/assets/explore/home-carousal-1-hero-bg.svg"}
                            bannerImage="/assets/explore/home-carousal-2-hero-image.svg"
                            buttonText="View Contracts Now"
                          />
                          <CarouselSlide
                            height="20rem"
                            title="Discover From Chains"
                            headingFontSize={style.font.h6}
                            descriptionFontSize={style.font.h7}
                            description="TRANSACTIONS • INDEXING • CHAINS"
                            avatarImage={GlobalIcons["base-chain"]}
                            // bgGrid="/assets/explore/mirror%20carousal%20bg%20grid.svg"
                            bgGrid=""
                            bgBlur={colorMode == "light" ? "/assets/explore/home_carousal_hero_bg_light.svg" : "/assets/explore/home-carousal-1-hero-bg.svg"}
                            bannerImage="/assets/explore/home-carousal-3-hero-image.svg"
                            buttonText="View Chains"
                          />
                        </Carousel>
                      </Box>
                    </Box>
                  </FlexRow>

                  {/* <FlexColumn>
            <TokenRow />
          </FlexColumn> */}

                  {/* <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
            <Heading
              fontSize={`${style.font.h3}`}
              fontWeight={`${style.fontWeight.dark}`}
              marginTop={`${style.margin.xxl}`}
            >
              Collections
            </Heading>
  
            <FlexRow hrAlign="flex-start" marginTop="lg">
              <Box
                width="20%"
                cursor="pointer"
                marginRight={style.margin.sm}
                onClick={() => userAssetsModal.onOpen()}
              >
                <UserContentCard title="NFT" description="45" />
              </Box>
              <Box
                width="20%"
                cursor="pointer"
                onClick={() => userAssetsModal.onOpen()}
              >
                <UserContentCard title="NFT" description="45" />
              </Box>
            </FlexRow>
          </FlexColumn> */}

                  <FlexColumn vrAlign="flex-start">
                    <CardNative
                      marginTop="xxl"
                      header={
                        <>
                          <FlexRow hrAlign="space-between">
                            <Heading
                              color={colorMode == "light" ? "#000" : ""}
                              fontSize={`${style.font.h3}`}
                              fontWeight={`${style.fontWeight.dark}`}
                              marginBottom={"0px"}
                            >
                              Feed
                            </Heading>
                            <InputSearch
                              width="25%"
                              height="40px"
                              placeholder="Search Meta"
                            />
                          </FlexRow>
                        </>
                      }
                    >
                      <MetaUserList hookData={useUserMeta} />
                    </CardNative>
                  </FlexColumn>

                  <UserAssetsModal modal={userAssetsModal} />
                  <UserXPModal modal={userXPModal} />
                  {/* <TokenModal modal={tokenModal} hookAlchemy={hookAlchemy} /> */}
                </>
              ) : (
                <>
                  <NavMeta />
                  <Box marginTop={style.margin.lg}>
                    <FlexRow hrAlign="center">
                      <Image
                        src={colorMode == "light" ? "/assets/userSearch-emptyState_light.svg" : "/assets/user-search-empty-state.svg"}
                        alt="no user found"
                      />
                    </FlexRow>
                    <Text
                      color={colorMode == "light" ? "#000" : ""}
                      textAlign="center"
                      fontSize={style.font.h2}
                      marginTop={style.margin.lg}
                    >
                      Oops! No user Found
                    </Text>
                    <FlexRow hrAlign="center" vrAlign="center">
                      <FlexColumn>
                        <Text color={colorMode == "light" ? "#000" : ""} textAlign="center" marginBottom="0">
                          The user you are looking from may not have claimed any
                          NFT yet,
                        </Text>
                        <Text
                          color={colorMode == "light" ? "#000" : ""}
                          textAlign="center"
                          marginTop="0"
                          marginBottom={style.margin.xl}
                        >
                          making them undiscoverable.
                        </Text>
                        <ButtonNative
                          variant="state_brand"
                          paddingLeft="xs"
                          paddingRight="xs"
                          paddingTop="sm"
                          paddingBottom="sm"
                          onClick={() => router.push("/")}
                          height="2rem"
                          textFontSize="h7"
                        >
                          Back to Search
                        </ButtonNative>
                      </FlexColumn>
                    </FlexRow>
                  </Box>
                </>
              )}
            </>
          ) : (
            <FlexColumn>
              <Loader size="lg" />
            </FlexColumn>
          )}
      </>
    );
  };

  const renderBody = () => {
    return (
      <Box width={"100%"} padding={"1.5rem 3%"}>
        <UserInfo />
      </Box>
    );
  };

  return (
    <FlexWindow
      view="row"
      navLeft={renderNavLeft()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default User;
