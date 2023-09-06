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
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  useClient,
  useConversations,
  useSendMessage
} from "@xmtp/react-sdk";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const Meta = () => {
  const hookMeta = useMeta();
  const router = useRouter();
  const { initialize } = useClient();
  const { conversations } = useConversations();
  const sendMessage = useSendMessage();
  const $signer = useAuthStore((state: any) => state.signer);

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
  const [tab, setTab] = useState<string>("Data");
  const options = [
    {
      href: "#",
      value: "Data",
    },
    {
      href: "#",
      value: "Sources",
    },
  ];

  const toast = useToast();

  const renderNav = () => {
    return <NavMeta />;
  };

  const renderMeta = () => {
    let rawDataKey;
    let rawDataValue: any;

    if (hookMeta?.metaData) {
      rawDataKey = Object.keys(hookMeta?.metaData?.meta?.data?.raw);
      rawDataValue = Object.values(hookMeta?.metaData?.meta?.data?.raw);
    }

    return (
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width="28%">
          {/* <CardNative height="fit-content" width="100%"></CardNative> */}
          {hookMeta.isLoading ? (
            <CardSkeleton />
          ) : (
            <MCard
              title={hookMeta?.metaData?.meta?.data?.modified?.meta_title}
              slug={hookMeta?.metaData?.meta_schema?.name}
              image={hookMeta?.metaData?.meta?.data?.modified?.meta_image}
              description={
                hookMeta?.metaData?.meta?.data?.modified?.meta_description
              }
            />
          )}
        </Box>
        <Box width="68%">
          <FlexRow hrAlign="space-between" height="fit-content">
            <Tabs
              options={options}
              onChange={setTab}
              value={tab}
              width="fit-content"
            />
            {/* <ButtonNative
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
            /> */}
          </FlexRow>
          {tab == "Data" && (
            <>
              {hookMeta?.metaData?.meta?.data?.modified?.meta_audio && (
                <CardNative
                  height="fit-content"
                  marginTop="sm"
                  width="100%"
                  header={
                    <>
                      <Heading fontSize={style.font.h4} mb="0px">
                        Music
                      </Heading>
                    </>
                  }
                >
                  <>
                    <MusicPlayer
                      audioUrl={`https://arweave.net/${hookMeta?.metaData?.meta?.data?.modified?.meta_audio?.substr(
                        5,
                        hookMeta?.metaData?.meta?.data?.modified?.meta_audio
                          .length - 5
                      )}`}
                    />
                  </>
                </CardNative>
              )}
              <CardNative
                height="fit-content"
                marginTop="sm"
                width="100%"
                header={
                  <>
                    <Heading fontSize={style.font.h4} mb="0px">
                      Ownership
                    </Heading>
                  </>
                }
              >
                <>
                  {hookMeta.isLoading ? (
                    <FlexRow width="100%" hrAlign="space-between">
                      <SkeletonCircle startColor="#11224A" endColor="#1B377B" />
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
              </CardNative>
              <CardNative
                height="fit-content"
                marginTop="sm"
                width="100%"
                header={
                  <>
                    <FlexRow hrAlign="space-between">
                      <Heading fontSize={style.font.h4}>Hex Data</Heading>
                    </FlexRow>
                  </>
                }
              >
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
              </CardNative>
              {hookMeta?.metaData?.meta?.data?.ipfs && (
                <CardNative
                  height="fit-content"
                  marginTop="sm"
                  width="100%"
                  header={
                    <>
                      <FlexRow hrAlign="space-between">
                        <Heading fontSize={style.font.h4}>Ipfs Data</Heading>
                      </FlexRow>
                    </>
                  }
                >
                  <Box
                    padding={style.padding.xs}
                  >
                    <FlexRow hrAlign="space-between">
                      <Heading mb="0" fontSize={style.font.h6} width={"20%"}>
                        {hookMeta?.metaData &&
                          Object.keys(hookMeta?.metaData?.meta?.data?.ipfs)[0]}
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
                          Object.keys(hookMeta?.metaData?.meta?.data?.ipfs)[0]
                          ]
                        ).map((item, index) => {
                          return (
                            <Box
                              display={"flex"}
                              key={index}
                              marginTop={style.margin.sm}
                              paddingBottom={index != Object.keys(
                                hookMeta?.metaData?.meta?.data?.ipfs[
                                Object.keys(hookMeta?.metaData?.meta?.data?.ipfs)[0]
                                ]
                              ).length - 1 && style.margin.xxs}
                              borderBottom={index != Object.keys(
                                hookMeta?.metaData?.meta?.data?.ipfs[
                                Object.keys(hookMeta?.metaData?.meta?.data?.ipfs)[0]
                                ]
                              ).length - 1 && style.card.border.card}
                            >
                              <Text
                                mr={style.margin.xs}
                                width={"20%"}
                              >{`${item} : `}</Text>
                              <Text width={"70%"} textAlign={"right"}>
                                {truncateString(typeof hookMeta?.metaData?.meta?.data?.ipfs[
                                  Object.keys(
                                    hookMeta?.metaData?.meta?.data?.ipfs
                                  )[0]
                                ][item] == "string"
                                  ? hookMeta?.metaData?.meta?.data?.ipfs[
                                  Object.keys(
                                    hookMeta?.metaData?.meta?.data?.ipfs
                                  )[0]
                                  ][item]
                                  : "[ ]", 50)}
                              </Text>
                              <Box
                                width="6%"
                                display={"flex"}
                                justifyContent={"flex-end"}
                                marginLeft={style.margin.xxs}
                              >
                                <Button size="xs" width="100%"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      typeof hookMeta?.metaData?.meta?.data
                                        ?.ipfs[
                                        Object.keys(
                                          hookMeta?.metaData?.meta?.data?.ipfs
                                        )[0]
                                      ][item] == "string"
                                        ? hookMeta?.metaData?.meta?.data?.ipfs[
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
                                >Copy</Button>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </CardNative>
              )}
            </>
          )}
          {tab == "Sources" && (
            <>
              <CardNative
                height="fit-content"
                marginTop="sm"
                width="100%"
                header={
                  <>
                    <FlexRow hrAlign="space-between">
                      <Heading fontSize={style.font.h4}>Recorded From</Heading>
                    </FlexRow>
                  </>
                }
              >
                {hookMeta?.metaData &&
                  hookMeta?.metaData?.meta?.sources.map(
                    (source: any, index: any) => {
                      return (
                        <Box
                          key={index}
                          padding={style.padding.xs}
                        >
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
                                    paddingBottom={index != Object.keys(source).length - 1 && style.margin.xxs}
                                    borderBottom={index != Object.keys(source).length - 1 && style.card.border.card}
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
                                      <Button size="xs" width="100%"
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
                                      >Copy</Button>
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
              </CardNative>
            </>
          )}
        </Box>
      </Box>
    );
  };

  const renderBody = () => {
    return (
      <>
        <Box
          paddingX={style.padding.xxs}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box
            style={{
              height: "fit-content",
              width: "100%",
              paddingBottom: `${style.margin["xxxl"]}`
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
      marginTop={style.nav.margin}
      view="both"
      navTop={renderNav()}
      navLeft={<NavLeft />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Meta;
