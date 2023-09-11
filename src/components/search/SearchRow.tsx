import { style } from "@/styles/StyledConstants";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const SearchRow = ({ text, onClick }: any) => {
  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={onClick}
      _hover={{
        cursor: "pointer",
        backgroundColor: "#030c1a",
        border: `${style.card.border.default}!important`,
      }}
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        padding: `${style.padding.xxs} ${style.padding.xs}`,
        borderRadius: `${style.card.borderRadius.button}`,
        border: `${style.card.border.transparent}`,
      }}
    >
      <Text mb={0} fontSize={style.font.h6}>
        {text}
      </Text>
    </Box>
  );
};

export default SearchRow;
