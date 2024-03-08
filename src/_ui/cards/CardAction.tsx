import { style } from "@/styles/StyledConstants";
import { Avatar, Text } from "@chakra-ui/react";
import FlexColumn from "../flex/FlexColumn";
import FlexRow from "../flex/FlexRow";
import { uiStyleCard } from "../_style";
import CardNative from "./CardNative";


type Props = {
    src?: any;
    heading?: any;
    width?: any;
    onClick?: any;
  };

export const CardAction = ({src, heading, width, onClick}: Props) => {
    return (
        <CardNative
        width={width ? width : "100%"}
        onClick={onClick}
        addStyle={uiStyleCard.search}
        >
            <FlexRow hrAlign="flex-start">
            <Avatar
            src={src}
            size="md"
            marginRight="1rem"
            />
            <FlexColumn width="80%" vrAlign="flex-start">
            <Text
                fontSize={style.font.h3}
                fontWeight={style.fontWeight.dark}
                m={0}
            >
                {heading}
            </Text>
            </FlexColumn>
        </FlexRow>
        </CardNative>
    )
}