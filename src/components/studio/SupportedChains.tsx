import FlexColumn from "@/_ui/flex/FlexColumn";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  data?: any;
  id?: any;
};

const SupportedChains = ({ data, id }: Props) => {
  const router = useRouter();
  return (
    <Box
      _hover={{
        transform: "scale(1.01,1.01)",
        border: "1px solid #197cec !important",
        boxShadow: "-0.15px 0.15px 28px 0px #004AD9",
      }}
      cursor={"pointer"}
      onClick={() => {
        router.push(`/search/network/${id}`);
      }}
      width={"20%"}
      border={style.card.border.default}
      background={style.card.bg.default}
      marginX={style.margin.sm}
      marginTop={style.margin.sm}
      padding={style.padding.sm}
      borderRadius={style.card.borderRadius.default}
      style={{
        transitionTimingFunction: "ease-in-out",
        transitionProperty: "all ",
        transitionDuration: "600ms",
      }}
    >
      <FlexColumn width="100%" vrAlign="center" hrAlign="center">
        <Image
          src={GlobalIcons[data.chainImage]}
          height={style.icon.sizes["3xl"]}
          alt="img"
          marginBottom={style.margin.sm}
        />
        <Heading fontSize={style.font.h5} textAlign="center" height="2.5rem">
          {data.chainName}
        </Heading>
      </FlexColumn>
    </Box>
  );
};

export default SupportedChains;
