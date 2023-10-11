import CardNative from "@/_ui/cards/CardNative";
import FlexRow from "@/_ui/flex/FlexRow";
import { FlexWindow } from "@/_ui/flex/FlexWindow";
import NavHeader from "@/_ui/nav/NavHeader";
import SupportedChains from "@/components/studio/SupportedChains";
import chains from "@/data/network";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, useColorMode } from "@chakra-ui/react";

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
      view="col"
      navTop={<NavHeader />}
      bodyElem={renderBody()}
    ></FlexWindow>
  );
};

export default Chains;
