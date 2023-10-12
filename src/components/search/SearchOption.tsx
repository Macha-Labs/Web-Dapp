import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const SearchOption = ({ text, onClick, image }: any) => {
  const {colorMode} = useColorMode();
  return (
    <Box
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={onClick}
      _hover={{
        cursor: "pointer",
        backgroundColor: `${colorMode == "light" ? "#f2f5fd" : "#030c1a"}`,
        border: `${colorMode == "light" ? "1px solid #e2e2e2" : style.card.border.default}!important`,
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
      <Heading fontWeight={400} mb={0} fontSize={style.font.h6} color={colorMode=="light" ?"#3d3d3d":""}>
        {text}
      </Heading>
      <Image height="30px" src={image} />
    </Box>
  );
};

export default SearchOption;
