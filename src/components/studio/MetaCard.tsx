import TagNative from "@/_ui/tag/TagNative";
import { style } from "@/styles/StyledConstants";
import { Text } from "@chakra-ui/react";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";

type Props = {
  image: string;
  heading: string;
  description: string;
  tags: any;
  width?: any;
  cardDirection?: any;
  onCardClick?: any;
};

export default function MetaCard({
  image,
  heading,
  description,
  tags,
  cardDirection = "column",
  width,
  onCardClick = (e?: any) => {},
}: Props) {
  return (
    <div
      style={{
        border: `${style.card.border.meta}`,
        borderRadius: `${style.card.borderRadius.default}`,
        background: `${style.card.bg.meta}`,
        padding: ` ${style.card.padding.default}`,
        margin: `${style.card.margin.default}`,
        width: ` ${width}`,
        display: "flex",
        flexDirection: cardDirection,
      }}
      onClick={() => {
        onCardClick();
      }}
    >
      <img src={image} width="100%" />
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start" margin="0px 10px">
        <Text fontSize="2xl" fontWeight="600">
          {heading}
        </Text>
        <Text>{description}</Text>
        <FlexRow hrAlign="flex-start" width="100%">
          <TagNative value="Tag 1" variant="state_xmtp" />
          <TagNative value="Tag 1" variant="state_xmtp" margin="0px 10px" />
        </FlexRow>
      </FlexColumn>
    </div>
  );
}
