import TagNative from "@/_ui/tag/TagNative";
import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { truncateString } from "@/helpers";

type Props = {
  image: string;
  heading: string;
  description: string;
  tags?: any;
  width?: any;
  cardDirection?: any;
  onCardClick?: any;
  height?: any;
};

export default function MetaCard({
  image,
  heading,
  description,
  tags,
  cardDirection = "column",
  width,
  onCardClick = (e?: any) => {},
  height,
}: Props) {
  return (
    <div
      style={{
        border: `${style.card.border.meta}`,
        borderRadius: `${style.card.borderRadius.default}`,
        background: `${style.card.bg.meta}`,
        padding: ` ${style.card.padding.default}`,
        margin: `${style.card.margin.default}`,
        width: `250px`,
        display: "flex",
        flexDirection: cardDirection,
        justifyContent: cardDirection == "row" ? "space-between" : "center",
        height: height ? height : "400px",
      }}
      onClick={() => {
        onCardClick();
      }}
    >
      <FlexColumn hrAlign="center">
        <div
          style={{
            width: "200px",
            height: "200px",
            maxWidth: "200px",
            maxHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={image}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </FlexColumn>
      <FlexColumn hrAlign="flex-start" vrAlign="flex-start" marginLeft={"sm"}>
        <Text fontSize="2xl" fontWeight="600">
          {truncateString(heading, 10)}
        </Text>
        <Text height={"80px"}>{truncateString(description, 50)}</Text>
        <FlexRow hrAlign="flex-start" width="100%">
          <TagNative value="Tag 1" variant="state_xmtp" />
          <TagNative value="Tag 1" variant="state_xmtp" margin="0px 10px" />
        </FlexRow>
      </FlexColumn>
    </div>
  );
}
