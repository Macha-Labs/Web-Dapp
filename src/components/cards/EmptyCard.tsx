import CardNative from "@/_ui/cards/CardNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import { style } from "@/styles/StyledConstants";
import { Heading, Image, Text, useColorMode } from "@chakra-ui/react";

const EmptyCard = () => {
  const { colorMode } = useColorMode();
  return (
    <CardNative width="100%">
      <FlexColumn>
        <Image
          src={
            colorMode == "light"
              ? "/assets/Light-no_matching-empty_state.svg"
              : "/assets/Dark-no_matching-empty_state.svg"
          }
          width={"15rem"}
          marginBottom={style.margin.md}
          alt="empty-state"
        />

        <Heading size="md">There is no matching activity</Heading>
        <Text>Please try again later</Text>
      </FlexColumn>
    </CardNative>
  );
};
export default EmptyCard;
