import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const SearchRow = ({ text, onClick, image }: any) => {
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
        justifyContent: "space-between",
      }}
    >
      <Heading fontWeight={400} mb={0} fontSize={style.font.h6}>
        {text}
      </Heading>
      <Image height="30px" src={image} />
    </Box>
  );
};

export default SearchRow;
