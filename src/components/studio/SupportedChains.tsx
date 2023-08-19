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
      cursor={"pointer"}
      onClick={() => {
        router.push(`/search/network/${id}`);
      }}
      width={"15%"}
    >
      <FlexColumn width="fit-content" vrAlign="center">
        <Image
          src={GlobalIcons[data.chainImage]}
          height={style.icon.sizes["3xl"]}
          alt="img"
          marginBottom={style.margin.sm}
        />
        <Heading fontSize={style.font.h5} textAlign="center" height="2rem">{data.chainName}</Heading>
      </FlexColumn>
    </Box>
  );
};

export default SupportedChains;
