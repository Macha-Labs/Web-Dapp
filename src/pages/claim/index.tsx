import FlexBody from "@/_ui/flex/FlexBody";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NftCard from "@/components/cards/NftCard";
import { style } from "@/styles/StyledConstants";
import { Box, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Claim = () => {
  const { colorMode } = useColorMode();
  const renderBody = () => {
    return (
      <Box paddingTop={style.padding.sm}>
        <NftCard
          heading="Macha NFT"
          image={
            colorMode == "light"
              ? "/assets/NoNftClaimed-rightBanner.svg"
              : "/assets/No_NFT_Claimed_Right.png"
          }
        />
      </Box>
    );
  };
  return (
    <FlexWindow
      view="both"
      bodyElem={renderBody()}
      //   navTop={<NavMeta />}
      noPaddingTop={true}
      navLeft={<NavLeft />}
    />
  );
};

export default Claim;
