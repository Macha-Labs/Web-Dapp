import MCard from "@/_sdk/MCard";
import JSONViewer from "@/_ui/JSONViewer";
import CardNative from "@/_ui/cards/CardNative";
import FlexBody from "@/_ui/flex/FlexBody";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import IconBase from "@/_ui/icons/IconsBase";
import InputSearch from "@/_ui/input/InputSearch";
import NavMeta from "@/_ui/nav/NavMeta";
import Tabs from "@/_ui/tabs/Tabs";
import TagNative from "@/_ui/tag/TagNative";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import NavButton from "@/components/buttons/NavButton";
import CopyableRow from "@/components/meta/CopyableRow";
import useMeta from "@/hooks/meta/useMeta";
import useAuthStore from "@/store/useAuthStore";
import { style } from "@/styles/StyledConstants";
import {
  Avatar,
  Box,
  Divider,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      href: "",
      value: "Data",
    },
    {
      href: "",
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
          <MCard
            title="Meta"
            // image="https://bit.ly/dan-abramov"
            owner_name="Blacke"
            owner_heading="Gordan"
            owner_image="https://bit.ly/dan-abramov"
            description={
              hookMeta?.metaData?.meta?.data?.modified?.meta_description
            }
            action_name="Click Here"
          />
        </Box>
        <Box width="68%">
          <Tabs
            options={options}
            onChange={setTab}
            value={tab}
            width="fit-content"
          />
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
                  <FlexRow hrAlign="space-between">
                    <FlexRow hrAlign="flex-start" width="fit-content">
                      <Avatar
                        size={"md"}
                        marginRight={style.margin.sm}
                        src="https://ik.imagekit.io/macha/Avatar/avatar-default.svg?updatedAt=1690541873826"
                      />
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
                  {rawDataKey &&
                    rawDataKey.map((item: any, index: any) => {
                      return (
                        <CopyableRow
                          key={index}
                          parameter={item}
                          value={rawDataValue[index]}
                          marginTop="sm"
                        />
                      );
                    })}
                </>
              </CardNative>
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

                    <FlexRow
                      hrAlign="flex-end"
                      vrAlign="flex-start"
                      width="80%"
                    >
                      {toggleIpfs ? (
                        <IconBase
                          slug="icon-chevron-up"
                          onClick={() => {
                            setToggleIpfs(!toggleIpfs);
                          }}
                        />
                      ) : (
                        <IconBase
                          slug="icon-chevron-down"
                          onClick={() => {
                            setToggleIpfs(!toggleIpfs);
                          }}
                        />
                      )}
                    </FlexRow>
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

                            <FlexRow
                              hrAlign="flex-end"
                              vrAlign="flex-start"
                              width="80%"
                            >
                              {toggleIpfs ? (
                                <IconBase
                                  slug="icon-chevron-up"
                                  onClick={() => {
                                    setToggleIpfs(!toggleIpfs);
                                  }}
                                />
                              ) : (
                                <IconBase
                                  slug="icon-chevron-down"
                                  onClick={() => {
                                    setToggleIpfs(!toggleIpfs);
                                  }}
                                />
                              )}
                            </FlexRow>
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
        <FlexBody>
          <Box
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
                marginTop: `${style.margin.xxl}`,
                height: "fit-content",
                paddingTop: `${style.padding.md}`,
                width: "90%",
              }}
            >
              {/* <Heading>Meta Name</Heading> */}

              {renderMeta()}
            </Box>
          </Box>
        </FlexBody>
      </>
    );
  };

  return (
    <FlexWindow
      marginTop={style.nav.margin}
      view="col"
      navElem={renderNav()}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Meta;
