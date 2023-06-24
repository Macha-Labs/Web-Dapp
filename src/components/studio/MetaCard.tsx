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
    <>
      <div
        style={{
          height: "400px",
          width: "250px",
          border: `${style.card.border.meta}`,
          borderRadius: `${style.card.borderRadius.default}`,
          background: `${style.card.bg.meta}`,
          padding: ` ${style.card.padding.default}`,
          marginRight: ` ${style.margin["lg"]}`,
          marginBottom: ` ${style.margin["lg"]}`,
        }}
        onClick={() => {
          onCardClick();
        }}
      >
        <div
          style={{ height: "50%", display: "flex", justifyContent: "center" }}
        >
          <Image
            src={image}
            width={"100%"}
            objectFit={"cover"}
            borderRadius={style.card.borderRadius.default}
          />
        </div>
        <div style={{ height: "50%", marginTop: `${style.margin["sm"]}` }}>
          <Text height="30px" fontSize={"2xl"} fontWeight={600}>
            {truncateString(heading, 15)}
          </Text>
          <Text height="50px">{truncateString(description, 50)}</Text>
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
