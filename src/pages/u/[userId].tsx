import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import InputSearch from "@/_ui/input/InputSearch";
import NavLeft from "@/_ui/nav/NavLeft";
import UserAssetsModal from "@/components/studio/UserAssetsModal";
import UserXPModal from "@/components/studio/UserXPModal";
import chains from "@/data/network";
import { truncateAddress } from "@/helpers";
import useAlchemy from "@/hooks/studio/useAlchemy";
import useUserMeta from "@/hooks/studio/useUserMeta";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { config } from "@/config";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import useAuthStore from "@/store/useAuthStore";
import AssetCard from "@/components/cards/AssetCard";
import CarouselSlide from "@/components/studio/CarouselSlide";
import MetaUserList from "@/components/meta/MetaUserList";
import TokenModal from "@/components/studio/TokenModal";
import NftCard from "@/components/cards/NftCard";
import Loader from "@/_ui/loader/Loader";

const User = () => {
  const $address = useAuthStore((state: any) => state.address);

  const hookAlchemy = useAlchemy();

  const userAssetsModal = useDisclosure();
  const userXPModal = useDisclosure();
  const router = useRouter();
  const tokenModal = useDisclosure();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      if (router.isReady) {
        await hookAlchemy.getNftsByAddress(router.query.userId);
        console.log("check hookAlchemy ", hookAlchemy.nftByAddress);
      }
    };
    fetch();
  }, [router.query.userId]);

  useEffect(() => {
    console.log("get Nft by address", hookAlchemy.nftByAddress);
    if (hookAlchemy.nftByAddress && hookAlchemy.nftByAddress[0]) {
      hookAlchemy.nftByAddress.map((nft: any) => {
        if (
          nft.contract.address ==
            config.MACHA_CALIBRATION_SBT_CONTRACT_ADDRESS ||
          nft.contract.address == config.MACHA_GOERLI_SBT_CONTRACT_ADDRESS ||
          nft.contract.address == config.MACHA_MUMBAI_SBT_CONTRACT_ADDRESS
        ) {
          setIsOwner(true);
        }
      });
    }
  }, [hookAlchemy.nftByAddress, $address]);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const UserInfo = () => {
    const userAddress = router.query.userId;
    return (
      <>
        {!hookAlchemy.isLoading ? (
          <>
            {isOwner ? (
              <>
                <Box
                  borderRadius={style.card.borderRadius.default}
                  background="#030c1a"
                  paddingBottom={`${style.padding.lg}`}
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
                    <Box
                      width={"10rem"}
                      height={"10rem"}
                      marginTop={"-7rem"}
                      borderRadius={"50%"}
                      background={"green"}
                      marginBottom={`${style.margin.sm}`}
                    >
                      <Image
                        src={GlobalIcons["avatar-default"]}
                        height={"100%"}
                        width={"100%"}
                        objectFit={"cover"}
                        alt="avatar-default"
                      />
                    </Box>
                    <FlexRow
                      hrAlign="space-between"
                      paddingLeft="xxl"
                      paddingRight="xxl"
                    >
                      <Box display={"flex"} width="25%" alignItems={"center"}>
                        <Box
                          display={"flex"}
                          flexDir={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          paddingRight={`${style.padding.md}`}
                        >
                          <Text
                            fontSize={`${style.font.h4}`}
                            fontWeight={style.fontWeight.dark}
                            marginBottom="0px"
                          >
                            950
                          </Text>
                          <Text marginBottom="0px">Followers</Text>
                        </Box>
                        <Box
                          display={"flex"}
                          flexDir={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <Text
                            fontSize={`${style.font.h4}`}
                            fontWeight={style.fontWeight.dark}
                            marginBottom="0px"
                          >
                            950
                          </Text>
                          <Text marginBottom="0px">Following</Text>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width="50%"
                      >
                        <Text fontSize={`${style.font.h4}`}>Aakash Taneja</Text>
                        <Text marginBottom="0px">
                          {truncateAddress(userAddress)}
                        </Text>
                      </Box>
                      <Box display={"flex"} width="25%">
                        {Object.keys(chains).map((chain: any, index) => {
                          return (
                            <Box
                              key={index}
                              borderRadius={"50%"}
                              paddingX={style.padding.xxs}
                            >
                              <Image
                                src={GlobalIcons[chains[chain].chainImage]}
                                height={"50px"}
                                width={"50px"}
                                alt=""
                              />
                            </Box>
                          );
                        })}
                      </Box>
                    </FlexRow>
                  </FlexColumn>
                </Box>
                <FlexRow marginTop="xxl" hrAlign="space-between">
                  <Box width="55%" marginRight="10px">
                    {/* <Heading
              fontSize={`${style.font.h3}`}
              fontWeight={`${style.fontWeight.dark}`}
            >
              My Assets
            </Heading> */}
                    <Flex marginTop={`${style.margin.lg}`}>
                      <AssetCard
                        title="34"
                        description="Tokens"
                        icon="/assets/icons/brand-token.svg"
                        onClick={() => {
                          tokenModal.onOpen();
                        }}
                      />
                      {/* <UserAssetCard
                title="7"
                description="Domains"
                icon="/assets/icons/brand-globe.svg"
              /> */}
                      <AssetCard
                        title="36"
                        description="XPs"
                        icon="/assets/icons/brand-bolt.svg"
                        onClick={() => {
                          userXPModal.onOpen();
                        }}
                      />
                    </Flex>
                  </Box>
                  <Box width="45%">
                    {/* <Heading
              fontSize={`${style.font.h3}`}
              fontWeight={`${style.fontWeight.dark}`}
            >
              Recommendations
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
                <TokenModal modal={tokenModal} />
              </>
            ) : (
              <NftCard
                heading="Claim NFT"
                subHeading="Own your Macha Profile"
                state={true}
                image="/assets/No_NFT_Claimed_Right.png"
              />
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
