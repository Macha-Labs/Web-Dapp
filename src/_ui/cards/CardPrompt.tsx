import { Heading } from "@chakra-ui/react";
import ButtonNative from "../buttons/ButtonNative";
import FlexRow from "../flex/FlexRow";
import { uiStyleCard } from "../_style";
import CardNative from "./CardNative";

type Props = {
  header?: any;
  width?: any;
  children?: any;
  footer?: any;
  onClick?: any;
  margin?: any;
};

const CardPrompt = ({
}: Props) => {
  return (
   <>
    <CardNative width="100%" addStyle={uiStyleCard.prompt}>
      <FlexRow width="100%" hrAlign="space-between">
        <Heading size="sm" margin={"0"}>Ensure you save your progress</Heading>
        <ButtonNative variant="state_brand_hover" size="sm" width="fit-content" height="fit-content">Save Account</ButtonNative>
      </FlexRow>
    </CardNative>
   </>
  );
};

export default CardPrompt;
