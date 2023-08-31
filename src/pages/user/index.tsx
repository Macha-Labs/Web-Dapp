import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
      <Box
        borderRadius={style.card.borderRadius.default}
        background={style.card.bg.overview}
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
          >
            <Image
              src={GlobalIcons["avatar-default"]}
              height={"100%"}
              width={"100%"}
              objectFit={"cover"}
            />
          </Box>
          <FlexRow hrAlign="space-between">
            <Box display={"flex"}>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text>950</Text>
                <Text>Followers</Text>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text>950</Text>
                <Text>Followers</Text>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>Aakash Taneja</Text>
              <Text>0x70...7470</Text>
            </Box>
            <Box display={"flex"}>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text>950</Text>
                <Text>Followers</Text>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text>950</Text>
                <Text>Followers</Text>
              </Box>
            </Box>
          </FlexRow>
        </FlexColumn>
      </Box>
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
