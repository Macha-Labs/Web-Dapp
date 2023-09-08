import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import chains from "@/data/network";
import GlobalIcons from "@/styles/GlobalIcons";
import { style as gStyle, style } from "../../styles/StyledConstants";

// import { getAllNfts } from "@/service/ApiService";

type Props = {
  heading?: string;
  subHeading?: string;
  image?: string;
  state?: boolean;
  floorPrice?: string;
  description?: string;
  owner_name?: string;
  owner_image?: string;
  owner_heading?: string;
  action_name?: string;
  action_type?: string;
  action_value?: string;
  width?: string;
  onClick?: any;
  slug?: any;
  cardHeight?: any;
  music?: any;
};

import MCard from "@/_sdk/MCard";
import useNftMint from "@/hooks/studio/useNftMint";
import { Box, Image, Text } from "@chakra-ui/react";
import Loader from "@/_ui/loader/Loader";
import CardNative from "@/_ui/cards/CardNative";
import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import { useState } from "react";

const NftCard = ({ heading, subHeading, image, state }: Props) => {
  const hookNftMint = useNftMint();
  const [chainValue, setChainValue] = useState<any>("Select Chain");
  const [avatar, setAvatar] = useState<any>("avatar-default");
  let chainFilterOptions: any = [];
  Object.keys(chains).forEach((key) => {
    chainFilterOptions.push({
      value: chains[key].chainName,

      leftIcon: chains[key].chainImage,
      onClick: () => {
        hookNftMint.setChainId(key);
        setChainValue(chains[key].chainName);
        setAvatar(chains[key].chainImage);
      },
    });
  });

  return (
    <FlexRow hrAlign="space-between" height="92vh" overFlow={"hidden"}>
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
        {!hookNftMint.isLoading ? (
          <>
            {state ? (
              <CardNative
                width="98%"
                header={
                  <FlexRow hrAlign="space-between">
                    <Text
                      fontSize={style.font.h3}
                      // lineHeight={"2.2rem"}
                      marginBottom={0}
                      fontWeight={style.fontWeight.dark}
                    >
                      {heading}
                    </Text>
                    <ButtonMenu
                      width="fit-content"
                      size={"lg"}
                      text={chainValue}
                      icon={{
                        slug: "icon-chevron-down",
                        style: "",
                      }}
                      options={chainFilterOptions}
                      avatar={avatar}
                    />
                  </FlexRow>
                }
                footer={
                  <ButtonNative
                    text="Claim NFT and own your Macha Profile"
                    onClick={() => {
                      console.log("submit clicked");
                      // hookCreatorCreate.nextFormStep();
                      hookNftMint.submit();
                    }}
                    variant="state_brand"
                    width="100%"
                    marginTop="xs"
                  />
                }
              >
                <Box
                  width="100%"
                  height="100%"
                  display={"flex"}
                  justifyContent={"center"}
                  // padding={style.padding.md}
                  // overflowY="scroll"
                >
                  <CardNative hrAlign={"center"} width="fit-content">
                    <Image src="/assets/Claim_Macha_Nft.png" height="20rem" />
                  </CardNative>
                </Box>
                <Text
                  fontSize={style.font.h5}
                  mb="0"
                  textAlign={"center"}
                  marginTop={style.margin.sm}
                >
                  It will take just 2 mins to setup profile and discover your
                  own chain content like ENS, Lens and more.
                </Text>
              </CardNative>
            ) : (
              <Box
                borderRadius={gStyle.card.borderRadius.default}
                border={gStyle.card.border.default}
                width="100%"
                height="92vh"
                padding={style.padding.md}
              >
                <Text
                  fontSize={style.font.h1}
                  marginBottom={0}
                  fontWeight={style.fontWeight.dark}
                  lineHeight="2.2rem"
                >
                  {heading}
                </Text>
                <Text
                  fontSize={style.font.h1}
                  marginTop={0}
                  fontWeight={style.fontWeight.dark}
                  marginBottom={style.margin.xxl}
                  lineHeight="2.2rem"
                >
                  {subHeading}
                </Text>

                <FlexColumn>
                  <FlexRow vrAlign="flex-start" marginBottom="lg">
                    <Image
                      src="/assets/Blue_tick.svg"
                      alt="blue_tick"
                      width="10%"
                    />
                    <Text fontSize={style.font.h5}>
                      Supercharged search algorithms by text and image models.
                    </Text>
                  </FlexRow>
                  <FlexRow vrAlign="flex-start" marginBottom="lg">
                    <Image
                      src="/assets/Blue_tick.svg"
                      alt="blue_tick"
                      width="10%"
                    />
                    <Text fontSize={style.font.h5}>
                      Supercharged search algorithms by text and image models.
                    </Text>
                  </FlexRow>
                  <FlexRow vrAlign="flex-start" marginBottom="lg">
                    <Image
                      src="/assets/Blue_tick.svg"
                      alt="blue_tick"
                      width="10%"
                    />
                    <Text fontSize={style.font.h5}>
                      Supercharged search algorithms by text and image models.
                    </Text>
                  </FlexRow>
                </FlexColumn>
              </Box>
            )}
          </>
        ) : (
          <FlexColumn height="40rem">
            <Loader size="lg" />
            <Text mt={style.margin.sm} fontSize={style.font.h5}>
              Please wait patiently while the transaction is confirmed.
            </Text>
          </FlexColumn>
        )}
      </FlexColumn>
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
        <Box
          borderRadius={gStyle.card.borderRadius.default}
          border={gStyle.card.border.default}
          width="98%"
          height={"100%"}
          overflow={"hidden"}
        >
          <Image
            src={image}
            alt="right image"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </FlexColumn>
    </FlexRow>
  );
};

export default NftCard;
