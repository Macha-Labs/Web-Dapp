import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import { truncateString } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";

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

export default function MetaHorizontalCard({
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
    <>
      <div
        style={{
          height: "200px",
          width: "400px",
          border: `${style.card.border.meta}`,
          borderRadius: `${style.card.borderRadius.default}`,
          background: `${style.card.bg.meta}`,
          padding: ` ${style.card.padding.default}`,
          display: "flex",
          flexDirection: "row",
          marginRight: ` ${style.margin["sm"]}`,
          marginBottom: ` ${style.margin["sm"]}`,
        }}
        onClick={() => {
          onCardClick();
        }}
      >
        <div style={{ width: "50%" }}>
          <Image
            src={image}
            height={"100%"}
            objectFit={"cover"}
            borderRadius={style.card.borderRadius.default}
          />
        </div>
        <div style={{ width: "50%" }}>
          <Text height="30px" fontSize={"2xl"} fontWeight={600}>
            {truncateString(heading, 10)}
          </Text>
          <Text height="50px">{truncateString(description, 30)}</Text>
          <FlexRow hrAlign="flex-start" width="100%" height="50px">
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
          </FlexRow>
        </div>
      </div>
    </>
  );
}
