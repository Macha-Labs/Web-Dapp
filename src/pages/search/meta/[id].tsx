import MCard from "@/_sdk/MCard";
import CardNative from "@/_ui/cards/CardNative";
import CardSkeleton from "@/_ui/cards/CardSkeleton";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavStudio from "@/_ui/nav/NavStudio";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import InputCopy from "@/_ui/input/InputCopy";
import useMeta from "@/hooks/meta/useMeta";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";

import {
  Avatar,
  Box,
  Heading,
  Skeleton,
  SkeletonCircle,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonNative from "@/_ui/buttons/ButtonNative";

const Meta = () => {
  const hookMeta = useMeta();
  const router = useRouter();
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
            <ButtonNative
              text="Share On XMTP"
              height="2.5rem"
              variant="state_default_hover"
              onClick={() => {}}
            />
          </FlexRow>
          {tab == "Data" && (
            <>
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
                          marginTop="sm"
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
                    background={style.input.bg.default}
                    padding={style.padding.xs}
                    border={style.input.border.default}
                    borderRadius={style.card.borderRadius.image}
                    marginTop={style.margin["sm"]}
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
                              marginTop={style.margin.sm}
                              key={index}
                            >
                              <Text
                                mr={style.margin.xs}
                                width={"20%"}
                              >{`${item} : `}</Text>
                              <Text width={"70%"} textAlign={"right"}>
                                {typeof hookMeta?.metaData?.meta?.data?.ipfs[
                                  Object.keys(
                                    hookMeta?.metaData?.meta?.data?.ipfs
                                  )[0]
                                ][item] == "string"
                                  ? hookMeta?.metaData?.meta?.data?.ipfs[
                                      Object.keys(
                                        hookMeta?.metaData?.meta?.data?.ipfs
                                      )[0]
                                    ][item]
                                  : "[ ]"}
                              </Text>
                              <Box
                                width="5%"
                                display={"flex"}
                                justifyContent={"flex-end"}
                              >
                                <IconBase
                                  slug="icon-copy"
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
                                />
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
                          background={style.input.bg.default}
                          padding={style.padding.xs}
                          border={style.input.border.default}
                          borderRadius={style.card.borderRadius.image}
                          marginTop={style.margin["sm"]}
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
                                  >
                                    <Text
                                      mr={style.margin.xs}
                                      width={"20%"}
                                    >{`${item} : `}</Text>
                                    <Text width={"70%"} textAlign={"right"}>
                                      {source[item]}
                                    </Text>
                                    <Box
                                      width="5%"
                                      display={"flex"}
                                      justifyContent={"flex-end"}
                                    >
                                      <IconBase
                                        slug="icon-copy"
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
                                      />
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
            alignItems: "center",
          }}
        >
          <Box
            style={{
              height: "fit-content",
              width: "100%",
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
      marginTop={style.nav.margin}
      view="both"
      navTop={renderNav()}
      navLeft={<NavLeft />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Meta;
