import ButtonNative from "@/_ui/buttons/ButtonNative";
import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

const HomeDev = () => {
  return (
    <Box
      style={{
        marginTop: `${style.margin.xxl}`,
        height: "fit-content",
        paddingTop: `${style.padding.md}`,
      }}
    >
      <Box
        background={style.card.bg.brand}
        borderRadius={style.card.borderRadius.default}
        padding={style.padding.sm}
      >
        <Text>thirdweb services now require an API key</Text>
        <Text>
          Action required for all users: use of client API keys mandatory by
          August 1st to continue using thirdweb infrastructure services.
        </Text>
        <Box display={"flex"}>
          <ButtonNative text="Create API key" />
        </Box>
      </Box>

      <Box marginTop={style.margin.xl}>
        <Text fontSize={style.font.h3} fontWeight={style.fontWeight.dark}>
          Get started quickly
        </Text>
      </Box>
    </Box>
  );
};

export default HomeDev;
