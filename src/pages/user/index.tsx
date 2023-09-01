import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import chains from "@/data/network";

const User = () => {
  const router = useRouter();
  //   const hookSearch = useSearch();

  useEffect(() => {
    if (router.isReady) {
      // console.log(router.query.search)
      //   hookSearch._fetch(String(router.query.search));
    }
  }, [router.query.search]);

  const renderNavLeft = () => {
    return <NavLeft />;
  };

  const renderNavTop = () => {
    return <NavMeta search={true} />;
  };

  const UserInfo = () => {
    return (
      <>
        <Box
          borderRadius={style.card.borderRadius.default}
          background={style.card.bg.overview}
          paddingBottom={`${style.padding.lg}`}
          border={style.card.border.default}
        >
          <FlexColumn>
            <Box
              height="15rem"
              width={"100%"}
              background={"red"}
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
            <FlexRow hrAlign="space-between">
              <Box
                display={"flex"}
                width="25%"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  display={"flex"}
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  paddingRight={`${style.padding.md}`}
                >
                  <Text fontSize={`${style.font.h4}`} marginBottom="0px">
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
                  <Text fontSize={`${style.font.h4}`} marginBottom="0px">
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
                <Text marginBottom="0px">0x70...7470</Text>
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
        <Flex marginTop={`${style.margin.xxl}`}>
          <Box width="60%" marginRight="10px">
            <Text
              fontSize={`${style.font.h4}`}
              fontWeight={`${style.fontWeight.dark}`}
            >
              My Assets
            </Text>
            <Flex marginTop={`${style.margin.xl}`}>
              <Box
                flex="1"
                borderRadius={style.card.borderRadius.default}
                background={style.card.bg.overview}
                marginRight="10px"
                border={style.card.border.default}
                paddingLeft={`${style.padding.md}`}
                paddingTop={`${style.padding.sm}`}
              >
                <Image
                  src="/assets/icons/brand-token.svg"
                  alt="brandToken"
                  marginBottom={style.margin.xxl}
                />
                <Text fontSize={`${style.font.h4}`} marginBottom="0px">
                  34
                </Text>
                <Flex>
                  <Box
                    flex="1.5"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Text>Tokens</Text>
                  </Box>
                  <Box flex="1" justifyContent="flex-end" alignItems="end">
                    End
                  </Box>
                </Flex>
              </Box>
              <Box
                flex="1"
                marginRight="10px"
                borderRadius={style.card.borderRadius.default}
                background={style.card.bg.overview}
                border={style.card.border.default}
                paddingLeft={`${style.padding.md}`}
                paddingTop={`${style.padding.sm}`}
              >
                <Image
                  src="/assets/icons/brand-globe.svg"
                  alt="brandGlobe"
                  marginBottom={style.margin.xxl}
                />
                <Text fontSize={`${style.font.h4}`} marginBottom="0px">
                  7
                </Text>
                <Flex>
                  <Box
                    flex="1.5"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Text>Domains</Text>
                  </Box>
                  <Box flex="1" justifyContent="flex-end" alignItems="end">
                    End
                  </Box>
                </Flex>
              </Box>
              <Box
                flex="1"
                borderRadius={style.card.borderRadius.default}
                background={style.card.bg.overview}
                border={style.card.border.default}
                paddingLeft={`${style.padding.md}`}
                paddingTop={`${style.padding.sm}`}
              >
                <Image
                  src="/assets/icons/brand-bolt.svg"
                  alt="brandBolt"
                  marginBottom={style.margin.xxl}
                />
                <Text fontSize={`${style.font.h4}`} marginBottom="0px">
                  36
                </Text>
                <Flex>
                  <Box
                    flex="1.5"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Text>NFTs Claimed</Text>
                  </Box>
                  <Box flex="1" justifyContent="flex-end" alignItems="end">
                    End
                  </Box>
                </Flex>
                {/* <Text>NFTs Claimed</Text> */}
              </Box>
            </Flex>
          </Box>
          <Box width="40%">
            <Text
              fontSize={`${style.font.h4}`}
              fontWeight={`${style.fontWeight.dark}`}
            >
              Recommendations
            </Text>
            <Box
              flex="1"
              height="100px"
              borderRadius={style.card.borderRadius.default}
              background={style.card.bg.overview}
              marginTop={`${style.margin.xl}`}
              border={style.card.border.default}
            ></Box>
          </Box>
        </Flex>

        <Text
          fontSize={`${style.font.h4}`}
          fontWeight={`${style.fontWeight.dark}`}
          marginTop={`${style.margin.xxl}`}
        >
          My Content
        </Text>

        <FlexRow hrAlign="space-between">
          <FlexColumn width="50%">
            <Box borderRadius={style.card.borderRadius.default} width="100%">
              <FlexRow>
                <FlexColumn>
                  <Box bg="white"></Box>
                </FlexColumn>
                <FlexColumn hrAlign="space-between">
                  <Box bg="blue"></Box>
                  <Box bg="red"></Box>
                </FlexColumn>
              </FlexRow>
            </Box>
            <Text>NFTs</Text>
            <Text>45</Text>
          </FlexColumn>
          <FlexColumn hrAlign="flex-start" vrAlign="flex-start" width="50%">
            <Box borderRadius={style.card.borderRadius.default} width="100%">
              <FlexRow>
                <FlexColumn marginRight="xxxs">
                  <Box bg="white" height="10rem" width="60%">sadasd</Box>
                </FlexColumn>
                <FlexColumn hrAlign="space-between">
                  <Box bg="blue" height="5rem" width="40%" marginBottom={`${style.margin.xxxs}`}>sdsada</Box>
                  <Box bg="red" height="5rem" width="40%">asfasf</Box>
                </FlexColumn>
              </FlexRow>
            </Box>
            <Text marginBottom="0px" marginTop={`${style.margin.md}`}>NFTs</Text>
            <Text marginBottom="0px">45</Text>
          </FlexColumn>
        </FlexRow>
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
