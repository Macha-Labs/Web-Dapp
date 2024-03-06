import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";
import FlexRow from "@/_ui/flex/FlexRow";
import { truncateString } from "@/helpers";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "../tag/TagNative";

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
  badge: any;
  active: any;
};

export default function CardColored({
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
  badge,
  active,
}: Props) {
  return (
    <>
      <div
        style={{
          height: "100px",
          width: "100%",
          border: `${style.card.border.meta}`,
          borderRadius: `${style.card.borderRadius.default}`,
          background: `${bg}`,
          borderColor: `${borderColor}`,
          padding: ` ${style.card.padding.default}`,
          marginRight: ` ${style.margin.lg}`,
          cursor: "pointer",
          opacity: `${active ? '1': '0.5'}`
        }}
        onClick={() => {
          active ? onCardClick(): '';
        }}
      >
        <div style={{}}>
          <FlexRow hrAlign="space-between">
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
            {badge && <FlexRow width="30%"><TagNative value={active ? 'Live' : 'Soon'} width="fit-content" /></FlexRow>}
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
