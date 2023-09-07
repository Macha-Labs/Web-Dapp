import MCard from "@/_sdk/MCard";
import CardNative from "@/_ui/cards/CardNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import InputCopy from "@/_ui/input/InputCopy";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import useMeta from "@/hooks/meta/useMeta";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";

import MusicPlayer from "@/components/studio/MusicPlayer";
import { truncateString } from "@/helpers";
import useAuthStore from "@/store/useAuthStore";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useClient, useConversations, useSendMessage } from "@xmtp/react-sdk";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import InputSearch from "@/_ui/input/InputSearch";
import useSearch from "@/hooks/studio/useSearch";

const MetaCopy = () => {
  const hookMeta = useMeta();
  const router = useRouter();
  const { initialize } = useClient();
  const { conversations } = useConversations();
  const sendMessage = useSendMessage();
  const $signer = useAuthStore((state: any) => state.signer);
  const hookSearch = useSearch();

  const handleConnect = useCallback(async () => {
    console.log($signer);
    await initialize({ signer: $signer });
    console.log(await initialize({ signer: $signer }));
  }, [initialize, $signer]);
  useEffect(() => {
    if (router.isReady) {
      hookMeta._fetch(router.query.id);
    }
  }, [router.query.id]);

  const [toggleIpfs, setToggleIpfs] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("Ownership");
  const options = [
    {
      href: "#",
      value: "Ownership",
    },
    {
      href: "#",
      value: "Hex Data",
    },
    {
      href: "#",
      value: "erc721A Module",
    },
    {
      href: "#",
      value: "Sources",
    },
  ];

  const toast = useToast();

  const renderNav = () => {
    return (
      <>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          padding="0% 12%"
        >
          <Box
            // className="py-3"
            style={{
              //   background: "#030c1a",
              //   padding: `${style.nav.padding.meta}`,
              marginTop: `${style.margin.sm}`,
              marginBottom: `${style.margin.sm}`,

              height: `${style.nav.height}`,
              //   border: `${style.nav.border.default}`,
              //   borderRadius: `${style.card.borderRadius.default}`,

              //   boxShadow: "0px 24px 64px 0px #000",
              width: "100%",
            }}
          >
            <FlexRow vrAlign="center" hrAlign="space-between">
              <Link href="/">
                <Image
                  className="headerLogo"
                  src="/assets/MACHALogotext.svg"
                  alt="logo"
                  width={128}
                  height={47}
                  // width={246}
                />
              </Link>
              <Box
                style={{ display: "flex", alignItems: "center" }}
                width={"20%"}
              >
                <InputSearch
                  width="100%"
                  height="2.2rem"
                  defaultValue={hookSearch.searchString}
                  value={hookSearch.searchString}
                  onChange={(e: any) =>
                    hookSearch.setSearchString(e.target.value)
                  }
                  onKeydown={(e: any) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      router.push(`/search?search=${hookSearch.searchString}`);
                    }
                  }}
                />

                {/* <Image
                style={{ marginLeft: `${style.margin.xs}`, cursor: "pointer" }}
                src={
                  isSearchOpen
                    ? GlobalIcons["icon-dark-close"]
                    : GlobalIcons["icon-dark-search"]
                }
                height="2.2rem"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              /> */}
              </Box>
            </FlexRow>
          </Box>
        </Box>
      </>
    );
  };

  const renderMeta = () => {
    let rawDataKey;
    let rawDataValue: any;

    if (hookMeta?.metaData?.meta?.data?.raw) {
      rawDataKey = Object.keys(hookMeta?.metaData?.meta?.data?.raw);
      rawDataValue = Object.values(hookMeta?.metaData?.meta?.data?.raw);
    }

    return (
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width="38%">
          {/* <CardNative height="fit-content" width="100%"></CardNative> */}
          {hookMeta.isLoading ? (
            <CardSkeleton />
          ) : (
            <MCard
              // cardHeight={"95vh"}
              musicplayer={hookMeta?.metaData?.meta?.data?.modified?.meta_audio}
              titleMaxw={"100%"}
              title={hookMeta?.metaData?.meta?.data?.modified?.meta_title}
              slug={
                hookMeta?.metaData?.meta_schema
                  ? hookMeta?.metaData?.meta_schema?.name
                  : hookMeta?.metaData?.meta_tags &&
                    hookMeta?.metaData?.meta_tags.length != 0
                  ? hookMeta?.metaData?.meta_tags[0]
                  : ""
              }
              image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
              description={
                hookMeta?.metaData?.meta?.data?.modified?.meta_description
              }
            />
          )}
        </Box>
        <Box width="58%">
          <CardNative
            header={
              <Tabs
                options={
                  hookMeta?.metaData?.meta?.sources
                    ? options
                    : [
                        {
                          href: "#",
                          value: "Data",
                        },
                      ]
                }
                onChange={setTab}
                value={tab}
                width="fit-content"
              />
            }
          >
            <>
              {tab == "Ownership" && (
                <>
                  <>
                    {hookMeta.isLoading ? (
                      <FlexRow width="100%" hrAlign="space-between">
                        <SkeletonCircle
                          startColor="#11224A"
                          endColor="#1B377B"
                        />
                        <Skeleton
                          startColor="#11224A"
                          endColor="#1B377B"
                          width="90%"
                        >
                          Harsh
                        </Skeleton>
                      </FlexRow>
                    ) : (
                      <FlexRow hrAlign="space-between">
                        <FlexRow hrAlign="flex-start" width="fit-content">
                          {hookMeta.isLoading ? (
                            <SkeletonCircle
                              startColor="#11224A"
                              endColor="#1B377B"
                              height="2rem"
                              marginRight={style.margin.xxs}
                            />
                          ) : (
                            <Avatar
                              size={"md"}
                              marginRight={style.margin.sm}
                              src={GlobalIcons["avatar-default"]}
                            />
                          )}
                          <FlexColumn
                            width="fit-content"
                            // hrAlign="flex-start"
                            vrAlign="flex-start"
                          >
                            <Text marginBottom={"0"} textAlign={"left"}>
                              {hookMeta?.metaData?.metaOwner}
                            </Text>
                          </FlexColumn>
                        </FlexRow>
                        <TagNative value="owner" size="md" />
                      </FlexRow>
                    )}
                  </>
                </>
              )}

              {tab == "Hex Data" && (
                <>
                  {hookMeta?.metaData?.meta?.data?.raw && (
                    <>
                      {hookMeta.isLoading && (
                        <FlexColumn>
                          <Skeleton
                            startColor="#11224A"
                            endColor="#1B377B"
                            marginBottom={style.margin.xxs}
                            height="3rem"
                            width="100%"
                          >
                            Macha
                          </Skeleton>
                          <Skeleton
                            startColor="#11224A"
                            endColor="#1B377B"
                            marginBottom={style.margin.xxs}
                            height="3rem"
                            width="100%"
                          >
                            Macha
                          </Skeleton>
                          <Skeleton
                            startColor="#11224A"
                            endColor="#1B377B"
                            marginBottom={style.margin.xxs}
                            height="3rem"
                            width="100%"
                          >
                            Macha
                          </Skeleton>
                        </FlexColumn>
                      )}
                      {!hookMeta.isLoading &&
                        rawDataKey &&
                        rawDataKey.map((item: any, index: any) => {
                          return (
                            <InputCopy
                              key={index}
                              parameter={item}
                              value={rawDataValue[index]}
                              lastChild={index == rawDataKey.length - 1}
                              firstChild={index == 0}
                            />
                          );
                        })}
                    </>
                  )}
                </>
              )}

              {tab == "Ipfs Data" && (
                <>
                  {" "}
                  {hookMeta?.metaData?.meta?.data?.ipfs && (
                    <Box padding={style.padding.xs}>
                      <FlexRow hrAlign="space-between">
                        <Heading mb="0" fontSize={style.font.h6} width={"20%"}>
                          {hookMeta?.metaData &&
                            Object.keys(
                              hookMeta?.metaData?.meta?.data?.ipfs
                            )[0]}
                        </Heading>

                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            width: "80%",
                          }}
                          onClick={() => {
                            setToggleIpfs(!toggleIpfs);
                          }}
                        >
                          {toggleIpfs ? (
                            <IconBase slug="icon-chevron-up" />
                          ) : (
                            <IconBase slug="icon-chevron-down" />
                          )}
                        </Box>
                      </FlexRow>
                      {toggleIpfs && (
                        <Box>
                          {Object.keys(
                            hookMeta?.metaData?.meta?.data?.ipfs[
                              Object.keys(
                                hookMeta?.metaData?.meta?.data?.ipfs
                              )[0]
                            ]
                          ).map((item, index) => {
                            return (
                              <Box
                                display={"flex"}
                                key={index}
                                marginTop={style.margin.sm}
                                paddingBottom={
                                  index !=
                                    Object.keys(
                                      hookMeta?.metaData?.meta?.data?.ipfs[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data?.ipfs
                                        )[0]
                                      ]
                                    ).length -
                                      1 && style.margin.xxs
                                }
                                borderBottom={
                                  index !=
                                    Object.keys(
                                      hookMeta?.metaData?.meta?.data?.ipfs[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data?.ipfs
                                        )[0]
                                      ]
                                    ).length -
                                      1 && style.card.border.card
                                }
                              >
                                <Text
                                  mr={style.margin.xs}
                                  width={"20%"}
                                >{`${item} : `}</Text>
                                <Text width={"70%"} textAlign={"right"}>
                                  {truncateString(
                                    typeof hookMeta?.metaData?.meta?.data?.ipfs[
                                      Object.keys(
                                        hookMeta?.metaData?.meta?.data?.ipfs
                                      )[0]
                                    ][item] == "string"
                                      ? hookMeta?.metaData?.meta?.data?.ipfs[
                                          Object.keys(
                                            hookMeta?.metaData?.meta?.data?.ipfs
                                          )[0]
                                        ][item]
                                      : "[ ]",
                                    50
                                  )}
                                </Text>
                                <Box
                                  width="6%"
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  marginLeft={style.margin.xxs}
                                >
                                  <Button
                                    size="xs"
                                    width="100%"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        typeof hookMeta?.metaData?.meta?.data
                                          ?.ipfs[
                                          Object.keys(
                                            hookMeta?.metaData?.meta?.data?.ipfs
                                          )[0]
                                        ][item] == "string"
                                          ? hookMeta?.metaData?.meta?.data
                                              ?.ipfs[
                                              Object.keys(
                                                hookMeta?.metaData?.meta?.data
                                                  ?.ipfs
                                              )[0]
                                            ][item]
                                          : "[ ]"
                                      );
                                      toast({
                                        title: "Copied To Clipboard",
                                        status: "success",
                                        duration: 3000,
                                      });
                                    }}
                                  >
                                    Copy
                                  </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  )}
                </>
              )}

              {tab == "erc721A Module" && (
                <>
                  {hookMeta?.metaData?.meta?.data?.erc721A_module && (
                    <Box padding={style.padding.xs}>
                      <FlexRow hrAlign="space-between">
                        <Heading mb="0" fontSize={style.font.h6} width={"20%"}>
                          {hookMeta?.metaData &&
                            Object.keys(
                              hookMeta?.metaData?.meta?.data?.erc721A_module
                            )[0]}
                        </Heading>

                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            width: "80%",
                          }}
                          onClick={() => {
                            setToggleIpfs(!toggleIpfs);
                          }}
                        >
                          {toggleIpfs ? (
                            <IconBase slug="icon-chevron-up" />
                          ) : (
                            <IconBase slug="icon-chevron-down" />
                          )}
                        </Box>
                      </FlexRow>
                      {toggleIpfs && (
                        <Box>
                          {Object.keys(
                            hookMeta?.metaData?.meta?.data?.erc721A_module[
                              Object.keys(
                                hookMeta?.metaData?.meta?.data?.erc721A_module
                              )[0]
                            ]
                          ).map((item, index) => {
                            return (
                              <Box
                                display={"flex"}
                                key={index}
                                marginTop={style.margin.sm}
                                paddingBottom={
                                  index !=
                                    Object.keys(
                                      hookMeta?.metaData?.meta?.data
                                        ?.erc721A_module[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data
                                            ?.erc721A_module
                                        )[0]
                                      ]
                                    ).length -
                                      1 && style.margin.xxs
                                }
                                borderBottom={
                                  index !=
                                    Object.keys(
                                      hookMeta?.metaData?.meta?.data
                                        ?.erc721A_module[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data
                                            ?.erc721A_module
                                        )[0]
                                      ]
                                    ).length -
                                      1 && style.card.border.card
                                }
                              >
                                <Text
                                  mr={style.margin.xs}
                                  width={"20%"}
                                >{`${item} : `}</Text>
                                <Text width={"70%"} textAlign={"right"}>
                                  {truncateString(
                                    typeof hookMeta?.metaData?.meta?.data
                                      ?.erc721A_module[
                                      Object.keys(
                                        hookMeta?.metaData?.meta?.data
                                          ?.erc721A_module
                                      )[0]
                                    ][item] == "string"
                                      ? hookMeta?.metaData?.meta?.data
                                          ?.erc721A_module[
                                          Object.keys(
                                            hookMeta?.metaData?.meta?.data
                                              ?.erc721A_module
                                          )[0]
                                        ][item]
                                      : "[...]",
                                    50
                                  )}
                                </Text>
                                <Box
                                  width="6%"
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  marginLeft={style.margin.xxs}
                                >
                                  <Button
                                    size="xs"
                                    width="100%"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        JSON.stringify(
                                          hookMeta?.metaData?.meta?.data
                                            ?.erc721A_module[
                                            Object.keys(
                                              hookMeta?.metaData?.meta?.data
                                                ?.erc721A_module
                                            )[0]
                                          ][item]
                                        )
                                      );
                                      toast({
                                        title: "Copied To Clipboard",
                                        status: "success",
                                        duration: 3000,
                                      });
                                    }}
                                  >
                                    Copy
                                  </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  )}
                </>
              )}

              {tab == "erc721 Module" && (
                <>
                  {hookMeta?.metaData?.meta?.data?.erc721_module && (
                    <Box padding={style.padding.xs}>
                      <FlexRow hrAlign="space-between">
                        <Heading mb="0" fontSize={style.font.h6} width={"20%"}>
                          {hookMeta?.metaData &&
                            Object.keys(
                              hookMeta?.metaData?.meta?.data?.erc721_module
                            )[0]}
                        </Heading>

                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            width: "80%",
                          }}
                          onClick={() => {
                            setToggleIpfs(!toggleIpfs);
                          }}
                        >
                          {toggleIpfs ? (
                            <IconBase slug="icon-chevron-up" />
                          ) : (
                            <IconBase slug="icon-chevron-down" />
                          )}
                        </Box>
                      </FlexRow>
                      {toggleIpfs && (
                        <Box>
                          {Object.keys(
                            hookMeta?.metaData?.meta?.data?.erc721_module[
                              Object.keys(
                                hookMeta?.metaData?.meta?.data?.erc721_module
                              )[0]
                            ]
                          ).map((item, index) => {
                            return (
                              <Box
                                display={"flex"}
                                key={index}
                                marginTop={style.margin.sm}
                                paddingBottom={
                                  index !=
                                    Object.keys(
                                      hookMeta?.metaData?.meta?.data
                                        ?.erc721_module[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data
                                            ?.erc721_module
                                        )[0]
                                      ]
                                    ).length -
                                      1 && style.margin.xxs
                                }
                                borderBottom={
                                  index !=
                                    Object.keys(
                                      hookMeta?.metaData?.meta?.data
                                        ?.erc721_module[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data
                                            ?.erc721_module
                                        )[0]
                                      ]
                                    ).length -
                                      1 && style.card.border.card
                                }
                              >
                                <Text
                                  mr={style.margin.xs}
                                  width={"20%"}
                                >{`${item} : `}</Text>
                                <Text width={"70%"} textAlign={"right"}>
                                  {truncateString(
                                    typeof hookMeta?.metaData?.meta?.data
                                      ?.erc721_module[
                                      Object.keys(
                                        hookMeta?.metaData?.meta?.data
                                          ?.erc721_module
                                      )[0]
                                    ][item] == "string"
                                      ? hookMeta?.metaData?.meta?.data
                                          ?.erc721_module[
                                          Object.keys(
                                            hookMeta?.metaData?.meta?.data
                                              ?.erc721_module
                                          )[0]
                                        ][item]
                                      : "[...]",
                                    50
                                  )}
                                </Text>
                                <Box
                                  width="6%"
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  marginLeft={style.margin.xxs}
                                >
                                  <Button
                                    size="xs"
                                    width="100%"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        JSON.stringify(
                                          hookMeta?.metaData?.meta?.data
                                            ?.erc721_module[
                                            Object.keys(
                                              hookMeta?.metaData?.meta?.data
                                                ?.erc721_module
                                            )[0]
                                          ][item]
                                        )
                                      );
                                      toast({
                                        title: "Copied To Clipboard",
                                        status: "success",
                                        duration: 3000,
                                      });
                                    }}
                                  >
                                    Copy
                                  </Button>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  )}
                </>
              )}

              {tab == "Sources" && hookMeta?.metaData?.meta?.sources && (
                <>
                  {hookMeta?.metaData?.meta?.sources &&
                    hookMeta?.metaData?.meta?.sources.map(
                      (source: any, index: any) => {
                        return (
                          <Box key={index} padding={style.padding.xs}>
                            <FlexRow hrAlign="space-between">
                              <Heading
                                mb="0"
                                fontSize={style.font.h6}
                                width={"20%"}
                              >
                                {source[Object.keys(source)[0]]}
                              </Heading>

                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "flex-start",
                                  width: "80%",
                                }}
                                onClick={() => {
                                  setToggleIpfs(!toggleIpfs);
                                }}
                              >
                                {toggleIpfs ? (
                                  <IconBase slug="icon-chevron-up" />
                                ) : (
                                  <IconBase slug="icon-chevron-down" />
                                )}
                              </Box>
                            </FlexRow>
                            {toggleIpfs && (
                              <Box>
                                {Object.keys(source).map((item, index) => {
                                  return (
                                    <Box
                                      key={index}
                                      display={"flex"}
                                      marginTop={style.margin.sm}
                                      paddingBottom={
                                        index !=
                                          Object.keys(source).length - 1 &&
                                        style.margin.xxs
                                      }
                                      borderBottom={
                                        index !=
                                          Object.keys(source).length - 1 &&
                                        style.card.border.card
                                      }
                                    >
                                      <Text
                                        mr={style.margin.xs}
                                        width={"20%"}
                                      >{`${item} : `}</Text>
                                      <Text width={"70%"} textAlign={"right"}>
                                        {truncateString(source[item], 50)}
                                      </Text>
                                      <Box
                                        width="6%"
                                        display={"flex"}
                                        justifyContent={"flex-end"}
                                        marginLeft={style.margin.xxs}
                                      >
                                        <Button
                                          size="xs"
                                          width="100%"
                                          onClick={() => {
                                            navigator.clipboard.writeText(
                                              source[item]
                                            );
                                            toast({
                                              title: "Copied To Clipboard",
                                              status: "success",
                                              duration: 3000,
                                            });
                                          }}
                                        >
                                          Copy
                                        </Button>
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Box>
                            )}
                          </Box>
                        );
                      }
                    )}
                </>
              )}
            </>
          </CardNative>
        </Box>
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <>
        <Box
          padding="1% 12%"
          marginTop={style.margin.xxl}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: `${style.padding.sm}`,
            paddingBottom: `${style.padding.sm}`,
          }}
        >
          <Box
            style={{
              height: "fit-content",
              width: "100%",
              // paddingBottom: `${style.margin["xxxl"]}`,
            }}
          >
            {/* <Heading>Meta Name</Heading> */}
            {renderMeta()}
          </Box>
        </Box>
      </>
    );
  };

  return (
    <FlexWindow
      background="#000"
      marginTop={style.nav.marginM}
      view="col"
      noPaddingTop={true}
      navTop={renderNav()}
      navLeft={<NavLeft />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default MetaCopy;
{
  /* <ButtonNative
              text="Connect to XMTP"
              height="2.5rem"
              variant="state_default_hover"
              onClick={handleConnect}
            />
            <ButtonNative
              text="Fetch XMTP Conversations"
              height="2.5rem"
              variant="state_default_hover"
              onClick={() => {
                console.log("conversations :  ", conversations);
              }}
            />
            <ButtonNative
              text="Snd msg to 1st conv"
              height="2.5rem"
              variant="state_default_hover"
              onClick={async () => {
                console.log("sending ...");
                await sendMessage.sendMessage(conversations[0], "hey");
                console.log("sent");
              }}
            /> */
}