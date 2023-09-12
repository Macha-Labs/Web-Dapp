import FlexRow from "@/_ui/flex/FlexRow";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const TokenRow = ({
  title,
  description,
  image,
  symbol,
  tokenId,
  type,
}: any) => {
  return (
    <>
      <FlexRow
        paddingTop="sm"
        paddingBottom="sm"
        height="fit-content"
        paddingLeft="sm"
        paddingRight="sm"
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          width={"100%"}
        >
          <Box width="3rem" height="3rem">
            <Image
              borderRadius={"50%"}
              src={image ? image : "/assets/token-placeholder.jpeg"}
            />
          </Box>
          <Box>
            <Heading
              paddingLeft={2}
              marginBottom={1}
              fontWeight={style.fontWeight.dark}
              fontSize={style.font.h6}
            >
              {title}
            </Heading>
            <Text paddingLeft={2} marginBottom={0} fontSize={style.font.h7}>
              {symbol}
            </Text>
          </Box>
        </Box>
        <FlexRow hrAlign="flex-end">
          <Box>
            <Heading
              paddingLeft={2}
              marginBottom={1}
              fontWeight={style.fontWeight.dark}
              fontSize={style.font.h6}
            >
              {tokenId}
            </Heading>
            <Text paddingLeft={2} marginBottom={0} fontSize={style.font.h7}>
              {type}
            </Text>
          </Box>
        </FlexRow>
      </FlexRow>
    </>
  );
};

export default TokenRow;
