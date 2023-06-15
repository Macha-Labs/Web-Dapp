import TagNative from "@/_ui/tag/TagNative";
import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import { truncateString } from "@/helpers";
import IconBase from "@/_ui/icons/IconsBase";

type Props = {
  image: string;
  heading: string;
  description: string;
  tags?: any;
  width?: any;
  cardDirection?: any;
  onCardClick?: any;
  height?: any;
  bg: any;
  borderColor: any;
};

export default function ColoredCard({
  image,
  heading,
  description,
  bg,
  borderColor,
  tags,
  cardDirection = "column",
  width,
  onCardClick = (e?: any) => {},
  height,
}: Props) {
  return (
    <>
      <div
        style={{
          height: "150px",
          width: "280px",
          border: `${style.card.border.meta}`,
          borderRadius: `${style.card.borderRadius.default}`,
          background: `${bg}`,
          borderColor: `${borderColor}`,
          padding: ` ${style.card.padding.default}`,
          marginRight: ` ${style.margin["lg"]}`,
          marginBottom: ` ${style.margin["lg"]}`,
        }}
        onClick={() => {
          onCardClick();
        }}
      >
        <div style={{}}>
          <FlexRow hrAlign="flex-start" vrAlign="center">
            <IconBase slug={image} />
            <Text
              fontSize={"xl"}
              fontWeight={600}
              className="m-b-0 m-l-0-5"
              lineHeight={"1rem"}
            >
              {heading}
            </Text>
          </FlexRow>
          <Text className="m-t-0-5">{truncateString(description, 50)}</Text>
          {/* <FlexRow hrAlign="flex-start" width="100%" height="50px">
            <TagNative
              value="Tag 1"
              variant="state_xmtp"
              size="sm"
              lineHeight="1.5"
            />
            <TagNative
              value="Tag 1"
              variant="state_xmtp"
              marginRight="xxs"
              size="sm"
              lineHeight="1.5"
            />
          </FlexRow> */}
        </div>
      </div>
    </>
  );
}
