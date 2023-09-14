import CardNative from "@/_ui/cards/CardNative";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavLeft from "@/_ui/nav/NavLeft";
import NavMeta from "@/_ui/nav/NavMeta";
import NavTop from "@/_ui/nav/NavTop";
import SupportedChains from "@/components/studio/SupportedChains";
import chains from "@/data/network";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";

const Chains = () => {

  const {colorMode} = useColorMode()

  const renderBody = () => {
    return (
      <CardNative
        height="fit-content"
        width="100%"
        header={
          <Heading color={colorMode == "light" ? "#282828" : ""} fontSize={style.font.h3} fontWeight={600} className="m-b-0">
            Explore Chains
          </Heading>
        }
      >
        <Box>
          <FlexRow hrAlign="flex-start" flexWrap="wrap">
            {Object.keys(chains).map((chain: any, index) => {
              // console.log(chains[chain]);
              return (
                <SupportedChains data={chains[chain]} id={chain} key={index} />
              );
            })}
          </FlexRow>
        </Box>
      </CardNative>
    );
  };

  return (
    <FlexWindow
      view="both"
      navLeft={<NavLeft />}
      navTop={<NavMeta />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Chains;
