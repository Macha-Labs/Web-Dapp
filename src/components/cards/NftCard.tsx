import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import chains from "@/data/network";
import { style as gStyle, style } from "../../styles/StyledConstants";

import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import CardNative from "@/_ui/cards/CardNative";
import Loader from "@/_ui/loader/Loader";
import useNftMint from "@/hooks/studio/useNftMint";
import {
  Box,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useAlchemy from "@/hooks/studio/useAlchemy";
import { config } from "@/config";
import { useRouter } from "next/router";
import GlobalIcons from "@/styles/GlobalIcons";
import { projectSlugToLogo } from "@/data/ProjectData";
import TagNative from "@/_ui/tag/TagNative";
import useXP from "@/hooks/studio/useXP";
import { useAccount } from "wagmi";
import UserXpTable from "../table/UserXpTable";
import InputSearch from "@/_ui/input/InputSearch";

// import { getAllNfts } from "@/service/ApiService";

type Props = {
  heading?: string;
  subHeading?: string;
  image?: string;
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

const NftCard = ({ heading, subHeading, image }: Props) => {
  const hookNftMint = useNftMint();
  const [chainValue, setChainValue] = useState<any>("Select Chain");
  const [avatar, setAvatar] = useState<any>("avatar-default");
  const hookAlchemy = useAlchemy();
  const router = useRouter();
  const [hasNft, setHasNft] = useState<boolean>(false);
  const hookXP = useXP();
  const { address, isConnected } = useAccount();
  const { colorMode } = useColorMode();

  let chainFilterOptions: any = [];
  Object.keys(chains).forEach((key) => {
    if (chains[key].allowMinting) {
      chainFilterOptions.push({
        value: chains[key].chainName,
        leftIcon: chains[key].chainImage,
        onClick: () => {
          hookNftMint.setChainId(key);
          setChainValue(chains[key].chainName);
          setAvatar(chains[key].chainImage);
        },
      });
    }
  });

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

  useEffect(() => {
    // if (address && isConnected) {
    hookXP._fetch();
    // hookXP._fetchUserXP(address);
    // }
  }, []);

  return (
    <FlexRow hrAlign="space-between" height="92vh" overFlow={"hidden"}>
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
        {hasNft ? (
          <>
            {!hookNftMint.isLoading ? (
              <>
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
                      <Image src="/assets/Claim_Macha_Nft.png" height="15rem" alt="icon-bolt"/>
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
              </>
            ) : (
              <FlexColumn height="40rem">
                <Loader size="lg" />
                <Text mt={style.margin.sm} fontSize={style.font.h5}>
                  Please wait patiently while the transaction is confirmed.
                </Text>
              </FlexColumn>
            )}
          </>
        ) : (
          <CardNative
            width="98%"
            header={
              <>
                <FlexRow hrAlign="space-between">
                  <Text
                    mb={0}
                    fontSize={style.font.h4}
                    fontWeight={style.fontWeight.dark}
                    color={colorMode == "light" ? "#000" : ""}
                  >
                    Earn Rewards
                  </Text>
                  <FlexRow width="50%">
                    <ButtonMenu
                      width="40%"
                      size={"lg"}
                      text="Highest"
                      icon={{
                        slug: "icon-chevron-down",
                        style: "",
                      }}
                      options={[]}
                    />
                    <InputSearch
                      height="40px"
                      placeholder="Search Token"
                      marginLeft={style.margin.sm}
                    />
                  </FlexRow>
                </FlexRow>
              </>
            }
            footer={
              <>
                <FlexRow hrAlign="space-between">
                  <Text
                    mb={0}
                    fontSize={style.font.h4}
                    fontWeight={style.fontWeight.dark}
                    width="50%"
                    color={colorMode == "light" ? "#000" : ""}
                  >
                    Your Rewarded XPs
                  </Text>
                  <FlexRow hrAlign="center" width="15%">
                    <Text mb={0} color={colorMode == "light" ? "#000" : ""}>
                      {/* {hookXP?.userXPList ? hookXP?.userXPList?.xps_earned : 0} */}
                    </Text>
                    <Image src={GlobalIcons["icon-bolt"]} alt="icon-bolt"/>
                  </FlexRow>
                </FlexRow>
              </>
            }
          >
            <Box marginTop="1rem" marginBottom={style.margin.md} width={"100%"}>
              <TableContainer rounded={"md"} height="400px" overflowY="scroll">
                <Table variant="unstyled" colorScheme="whiteAlpha" size="sm">
                  <Thead
                    position="sticky"
                    top={0}
                    zIndex="docked"
                    background={style.modal.bg.contractModal}
                    borderBottom={colorMode == "light" ? "1px solid #e2e2e2" : style.modal.border.contract}
                  >
                    <Tr justifyContent="space-between">
                      <Th
                        style={{
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          textAlign: "left",
                          color: "white",
                          fontWeight: "600",
                          fontSize: style.font.h6,
                          borderCollapse: "separate",
                          borderSpacing: "0 1rem",
                          backgroundColor: `${
                            colorMode == "light" ? "#ffffff" : ""
                          }`,
                        }}
                      >
                        <Text color={colorMode == "light" ? "#000" : ""} mb={0}>
                          Activities
                        </Text>
                      </Th>

                      <Th
                        style={{
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "600",
                          fontSize: style.font.h6,
                          borderCollapse: "separate",
                          borderSpacing: "0 1rem",
                          width: "30%",
                          backgroundColor: `${
                            colorMode == "light" ? "#ffffff" : ""
                          }`,
                        }}
                      >
                        <Text
                          color={colorMode == "light" ? "#000" : ""}
                          mb={0}
                          // textAlign="left"
                        >
                          Status
                        </Text>
                      </Th>
                      <Th
                        style={{
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          textAlign: "center",
                          color: "white",
                          fontWeight: "600",
                          fontSize: style.font.h6,
                          borderCollapse: "separate",
                          borderSpacing: "0 1rem",
                          backgroundColor: `${
                            colorMode == "light" ? "#ffffff" : ""
                          }`,
                        }}
                      >
                        <FlexRow>
                          <Text
                            color={colorMode == "light" ? "#000" : ""}
                            mb={0}
                          >
                            XP
                          </Text>
                          <Image src={GlobalIcons["icon-bolt"]} alt="icon-bolt" />
                        </FlexRow>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hookXP.XPList &&
                      hookXP.XPList.map((item: any, index: any) => (
                        <Tr justifyContent="space-between" key={index}>
                          <Td
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "20px",
                              textAlign: "center",
                              color: "white",
                              fontWeight: "600",
                              fontSize: style.font.h6,
                              borderCollapse: "separate",
                              borderSpacing: "0 1rem",
                            }}
                          >
                            <FlexRow hrAlign="flex-start">
                              <Image
                                src={
                                  GlobalIcons[projectSlugToLogo[item?.project]]
                                }
                                height="2rem"
                                marginRight={style.margin.xs}
                                alt="item.project"
                              />
                              <Text
                                fontSize={style.font.h6}
                                mb={0}
                                color={colorMode == "light" ? "#000" : ""}
                              >
                                {item?.title}
                              </Text>
                            </FlexRow>
                          </Td>
                          {/* <Box
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          > */}
                            <Td
                              style={{
                                paddingTop: "20px",
                                paddingBottom: "20px",
                                textAlign: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "600",
                                fontSize: style.font.h6,
                                borderCollapse: "separate",
                                borderSpacing: "0 1rem",
                                marginRight: `0.1rem`,
                                width: "60%",
                              }}
                            >
                              <TagNative
                                variant={
                                  item?.status != "claimed" ? "state_xmtp" : ""
                                }
                                value={
                                  item?.status == "claimed"
                                    ? "Claimed"
                                    : "Claim"
                                }
                              />
                            </Td>
                            <Td
                              style={{
                                paddingTop: "20px",
                                paddingBottom: "20px",
                                textAlign: "center",
                                color: "white",
                                fontWeight: "600",
                                fontSize: style.font.h6,
                                borderCollapse: "separate",
                                borderSpacing: "0 1rem",
                              }}
                            >
                              <FlexRow>
                                <Text
                                  color={colorMode == "light" ? "#000" : ""}
                                  mb={0}
                                >
                                  {item?.points}
                                </Text>
                                <Image src={GlobalIcons["icon-bolt"]} alt="icon-bolt" />
                              </FlexRow>
                            </Td>
                          {/* </Box> */}
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </CardNative>
        )}
      </FlexColumn>
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start">
        <Box
          borderRadius={gStyle.card.borderRadius.default}
          border={colorMode == "light" ? "1px solid #e2e2e2" : gStyle.card.border.default}
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
