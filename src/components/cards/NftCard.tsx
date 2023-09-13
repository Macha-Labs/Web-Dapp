import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import chains from "@/data/network";
import { style as gStyle, style } from "../../styles/StyledConstants";

import ButtonMenu from "@/_ui/buttons/ButtonMenu";
import CardNative from "@/_ui/cards/CardNative";
import InputSearch from "@/_ui/input/InputSearch";
import Loader from "@/_ui/loader/Loader";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { config } from "@/config";
import { projectSlugToLogo } from "@/data/ProjectData";
import useAlchemy from "@/hooks/studio/useAlchemy";
import useNftMint from "@/hooks/studio/useNftMint";
import useUserMeta from "@/hooks/studio/useUserMeta";
import useXP from "@/hooks/studio/useXP";
import GlobalIcons from "@/styles/GlobalIcons";
import {
  Box,
  Heading,
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import MetaUserList from "../meta/MetaUserList";
import TokenRow from "../studio/TokenRow";
import { truncateAddress } from "@/helpers";
import Avatar from "boring-avatars";
import { ConnectWalletButton } from "../ConnectWalletButton";

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
  const { chain } = useNetwork();
  const hookNftMint = useNftMint();
  const [chainValue, setChainValue] = useState<any>("Select Chain");
  const [avatar, setAvatar] = useState<any>("avatar-default");
  const hookAlchemy = useAlchemy();
  const router = useRouter();
  const [hasNft, setHasNft] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<any>("Tokens");
  const [tokenLoading, setTokenLoading] = useState<boolean>();
  const [nftLoading, setNftLoading] = useState<boolean>();

  const [chainId, setChainId] = useState<any>(1);
  const hookXP = useXP();
  const { address } = useAccount();
  const { colorMode } = useColorMode();
  const hookUserMeta = useUserMeta();

  const options: any = [
    {
      value: "Tokens",
      href: "#",
    },
    {
      value: "NFTs",
      href: "#",
    },
    {
      value: "Meta",
      href: "#",
    },
    // {
    //   value: "XPs",
    //   href: "#",
    // },
  ];

  let chainFilterOptions: any = [];
  Object.keys(chains).forEach((key) => {
    chainFilterOptions.push({
      value: chains[key].chainName,

      leftIcon: chains[key].chainImage,
      onClick: () => {
        hookNftMint.setChainId(key);
        setChainId(key);
        setChainValue(chains[key].chainName);
        setAvatar(chains[key].chainImage);
      },
    });
  });

  useEffect(() => {
    // console.log("called coz nftbyaddresschange change");
    // console.log("get Nft by address", hookAlchemy.nftByAddress);
    if (hookAlchemy.nftByAddress && hookAlchemy.nftByAddress[0]) {
      setNftLoading(true);
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
        setNftLoading(false);
      });
    } else {
      setHasNft(false);
    }
  }, [hookAlchemy.nftByAddress]);

  useEffect(() => {
    console.log("called coz addresss change", address);
    if (address) {
      const fetch = async () => {
        await hookAlchemy.getNftsByAddress(address, chains);
        await hookXP._fetch();
      };
      fetch();
    }
  }, [address]);

  useEffect(() => {
    setTokenLoading(true);
    if (address) {
      const fetchToken = async () => {
        await hookAlchemy.fetchTokensByAddress(chainId, address);
        setTokenLoading(false);
      };
      fetchToken();
    }
  }, [chainId, address]);

  useEffect(() => {
    if (chain) {
      hookNftMint.setChainId(chain.id);
      setChainId(chain.id);
      setChainValue(chains[chain.id].chainName);
      setAvatar(chains[chain.id].chainImage);
    }
  }, [chain]);

  return (
    <FlexRow hrAlign="space-between" height="90vh" overFlow={"hidden"}>
      {!address ? (
        <FlexColumn height="100%">
          <ConnectWalletButton />
        </FlexColumn>
      ) : (
        <FlexColumn height="100%">
          {nftLoading ? (
            <FlexColumn height="100%">
              <Loader size="sm" />
            </FlexColumn>
          ) : (
            <FlexRow height="100%">
              <FlexColumn hrAlign="flex-start" vrAlign="flex-start" width="30%">
                <FlexColumn height="100%" hrAlign="flex-start">
                  {!hasNft ? (
                    <>
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
                    </>
                  ) : (
                    <CardNative width="98%">
                      <FlexColumn hrAlign="flex-start">
                        <Box height={"10rem"}>
                          <Avatar name={address} size={"sm"} />
                        </Box>
                        <FlexRow hrAlign="center" height="fit-content">
                          <Text
                            fontSize={style.font.h4}
                            fontWeight={style.fontWeight.dark}
                            marginTop={style.margin.sm}
                            textAlign={"center"}
                            color={colorMode == "light" ? "#3d3d3d" : ""}
                          >
                            {truncateAddress(address)}
                          </Text>
                        </FlexRow>
                      </FlexColumn>
                    </CardNative>
                  )}
                </FlexColumn>
              </FlexColumn>
              <FlexColumn hrAlign="flex-start" vrAlign="flex-start" width="70%">
                <FlexColumn height="100%" hrAlign="flex-start">
                  {!hasNft ? (
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
                                  color={colorMode == "light" ? "#3d3d3d" : ""}
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
                              <CardNative
                                hrAlign={"center"}
                                width="fit-content"
                              >
                                <Image
                                  src="/assets/Claim_Macha_Nft.png"
                                  height="100%"
                                />
                              </CardNative>
                            </Box>
                            <Text
                              fontSize={style.font.h5}
                              mb="0"
                              textAlign={"center"}
                              margin="auto"
                              marginTop={style.margin.sm}
                              width={"70%"}
                              color={colorMode == "light" ? "#3d3d3d" : ""}
                            >
                              It will take just 2 mins to setup profile and
                              discover your own chain content like ENS, Lens and
                              more.
                            </Text>
                          </CardNative>
                        </>
                      ) : (
                        <FlexColumn height="40rem">
                          <Loader size="lg" />
                          <Text
                            mt={style.margin.sm}
                            fontSize={style.font.h5}
                            color={colorMode == "light" ? "#3d3d3d" : ""}
                          >
                            Please wait patiently while the transaction is
                            confirmed.
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
                            <FlexRow hrAlign="flex-start">
                              <Tabs
                                width="fit-content"
                                options={options}
                                gstyle={{ fontSize: `${style.font.h5}` }}
                                value={selectedTab}
                                onChange={(value: any) => {
                                  setSelectedTab(value);
                                }}
                              />
                            </FlexRow>
                            <FlexRow>
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
                              color={colorMode == "light" ? "#3d3d3d" : ""}
                            >
                              {selectedTab == "XPs"
                                ? "Your Rewarded XPs"
                                : selectedTab == "Tokens"
                                ? "Your Total Tokens"
                                : selectedTab == "NFTs"
                                ? "Your Total NFTs"
                                : "Your Total Metas"}
                            </Text>
                            <FlexRow hrAlign="center" width="15%">
                              <Heading
                                mb={0}
                                fontSize={style.font.h4}
                                color={colorMode == "light" ? "#3d3d3d" : ""}
                              >
                                {selectedTab == "Tokens"
                                  ? hookAlchemy?.userTokens &&
                                    hookAlchemy?.userTokens.length
                                  : selectedTab == "NFTs"
                                  ? hookAlchemy?.nftByAddress &&
                                    hookAlchemy?.nftByAddress.length
                                  : ""}
                              </Heading>
                            </FlexRow>
                          </FlexRow>
                        </>
                      }
                    >
                      <FlexColumn hrAlign="flex-start">
                        {selectedTab == "XPs" && (
                          <>
                            <Box
                              marginTop="1rem"
                              marginBottom={style.margin.md}
                              width={"100%"}
                            >
                              <TableContainer
                                rounded={"md"}
                                height="400px"
                                overflowY="scroll"
                              >
                                <Table
                                  variant="unstyled"
                                  colorScheme="whiteAlpha"
                                  size="sm"
                                >
                                  <Thead
                                    position="sticky"
                                    top={0}
                                    zIndex="docked"
                                    background={style.modal.bg.contractModal}
                                    borderBottom={style.modal.border.contract}
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
                                        }}
                                      >
                                        Activities
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
                                          width: "50%",
                                        }}
                                      >
                                        Status
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
                                        }}
                                      >
                                        <FlexRow>
                                          <Text mb={0}>XP</Text>
                                          <Image
                                            src={GlobalIcons["icon-bolt"]}
                                          />
                                        </FlexRow>
                                      </Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    {hookXP.XPList &&
                                      hookXP.XPList.map(
                                        (item: any, index: any) => (
                                          <Tr
                                            justifyContent="space-between"
                                            key={index}
                                          >
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
                                                    GlobalIcons[
                                                      projectSlugToLogo[
                                                        item?.project
                                                      ]
                                                    ]
                                                  }
                                                  height="2rem"
                                                  marginRight={style.margin.xs}
                                                />
                                                <Text
                                                  fontSize={style.font.h4}
                                                  mb={0}
                                                >
                                                  {item?.title}
                                                </Text>
                                              </FlexRow>
                                            </Td>
                                            <Box
                                              style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                              }}
                                            >
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
                                                    item?.status != "claimed"
                                                      ? "state_xmtp"
                                                      : ""
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
                                                  <Text mb={0}>
                                                    {item?.points}
                                                  </Text>
                                                  <Image
                                                    src={
                                                      GlobalIcons["icon-bolt"]
                                                    }
                                                  />
                                                </FlexRow>
                                              </Td>
                                            </Box>
                                          </Tr>
                                        )
                                      )}
                                  </Tbody>
                                </Table>
                              </TableContainer>
                            </Box>
                          </>
                        )}

                        {selectedTab == "NFTs" && (
                          <>
                            <Box
                              marginTop="1rem"
                              marginBottom={style.margin.md}
                              overflowY="auto"
                              height="20rem"
                              width={"100%"}
                            >
                              {hookAlchemy.nftByAddress.map(
                                (nft: any, index: any) => {
                                  return (
                                    <TokenRow
                                      key={index}
                                      title={nft.contract.name}
                                      symbol={nft.contract.symbol}
                                      tokenId={nft.tokenId}
                                      type={nft.contract.tokenType}
                                    />
                                  );
                                }
                              )}
                            </Box>
                          </>
                        )}

                        {selectedTab == "Tokens" && (
                          <FlexColumn>
                            <FlexRow
                              hrAlign="space-between"
                              height="fit-content"
                            >
                              <Heading
                                fontSize={style.font.h5}
                                // lineHeight={"2.2rem"}
                                marginBottom={0}
                                fontWeight={style.fontWeight.dark}
                                color={colorMode == "light" ? "#3d3d3d" : ""}
                              >
                                Your Tokens on Network
                              </Heading>
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
                            {tokenLoading ? (
                              <FlexColumn height="100%">
                                <Loader size="sm" />
                              </FlexColumn>
                            ) : (
                              <FlexColumn height="100%" hrAlign="flex-start">
                                {hookAlchemy?.userTokens &&
                                  hookAlchemy?.userTokens.map(
                                    (token: any, index: any) => {
                                      return (
                                        <TokenRow
                                          key={index}
                                          title={token.name}
                                          symbol={token.symbol}
                                          tokenId={token.balance}
                                          image={token.logo}
                                        />
                                      );
                                    }
                                  )}
                              </FlexColumn>
                            )}
                          </FlexColumn>
                        )}

                        {selectedTab == "Meta" && (
                          <>
                            <MetaUserList hookData={hookUserMeta} />
                          </>
                        )}
                      </FlexColumn>
                    </CardNative>
                  )}
                </FlexColumn>
              </FlexColumn>
            </FlexRow>
          )}
        </FlexColumn>
      )}
    </FlexRow>
  );
};

export default NftCard;
