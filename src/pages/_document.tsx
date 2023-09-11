import FlexRow from "@/_ui/flex/FlexRow";
import theme from "@/styles/StyledChakraTheme";
import { style } from "@/styles/StyledConstants";
import { Box, Button, ColorModeScript, Image, Text } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Box
          sx={{
            "@media screen and (min-width: 769px)": { display: "none" },
          }}
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
            backgroundImage="url(/assets/Empty-state-Blur.svg)"
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
            <Image
              src="/assets/empty-state-illustration - phone.svg"
              width={"15rem"}
            // marginTop={style.margin.xxl}
            />
            <Text
              marginBottom={style.margin.sm}
              marginTop={style.margin.xl}
              fontSize={style.font.h5}
              textAlign={"center"}
            >
              Thanks for visiting!
            </Text>
            <Text
              fontSize={style.font.h4}
              textAlign={"center"}
              marginBottom={style.margin.xl}
            >
              This link is currently only accessible on desktop.
            </Text>
            <Text
              fontSize={style.font.h4}
              color={style.color["white.5"]}
              textAlign={"center"}
            // marginBottom={style.margin.lg}
            >
              Good news- our mobile app is in the works and will be available
              soon.
            </Text>
            <FlexRow height="fit-content">
              <Link
                href={"https://twitter.com/intent/follow?screen_name=Macha0x"}
              >
                <Button
                  style={{
                    background: `${style.button.bg.active}`,
                    color: "#FF",
                  }}
                  padding={style.padding.sm}
                  borderRadius={style.button.borderRadius.default}
                  height={"2rem"}
                >
                  Follow On Twitter
                </Button>
              </Link>
            </FlexRow>
          </Box>
        </Box>
        <Box
          sx={{
            "@media screen and (max-width: 768px)": {
              display: "none",
            },
          }}
        >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </Box>
      </body>
    </Html>
  );
}
