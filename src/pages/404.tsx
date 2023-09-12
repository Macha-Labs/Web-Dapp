import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Box, Button, Image, Text, useColorMode } from "@chakra-ui/react";
import Link from "next/link";

const Custom404 = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={"#000"}
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundPosition="top center"
        paddingX={style.padding.sm}
      >
        <Image
          src="/assets/Macha-logo-text.svg"
          width={"10rem"}
          marginBottom={style.margin.xxl}
        />
        <Text
          marginBottom={style.margin.xl}
          fontSize={style.font.h3}
          textAlign={"center"}
        >
          404 - Page Not Found
        </Text>
        <Image
          src="/assets/empty-state-illustration - phone.svg"
          width={"15rem"}
          marginBottom={style.margin.xxl}
        />
        <Text
          fontSize={style.font.h4}
          textAlign={"center"}
          marginBottom={style.margin.xl}
        >
          Sorry, the page you are looking for does not exist.
        </Text>
        <FlexRow height="fit-content">
          <Link href="/">
            <Button
              style={{
                background: `${style.button.bg.active}`,
                // color: "#FF",
              }}
              padding={style.padding.sm}
              borderRadius={style.button.borderRadius.default}
              height={"2rem"}
            >
              <Text color={colorMode == "light" ? "#fff" : ""} mb={0}>
                Head back home
              </Text>
            </Button>
          </Link>
        </FlexRow>
      </Box>
    </Box>
  );
};
export default Custom404;
