import FlexRow from "@/_ui/flex/FlexRow";
import TagNative from "@/_ui/tag/TagNative";
import { truncateString } from "@/helpers";
import { style } from "@/styles/StyledConstants";
import { Image, Text } from "@chakra-ui/react";

type Props = {
  image?: string;
  heading: string;
  description: string;
  tags?: string[];
  width?: any;
  cardView?: string;
  onCardClick?: any;
  height?: any;
};

export default function MetaCard({
  image,
  heading,
  description,
  tags,
  cardView = "horizontal",
  width,
  onCardClick = (e?: any) => {},
  height,
}: Props) {
  console.log("Got tags ", tags);
  const horizontalView = () => {
    return (
      <>
        <div
          style={{
            height: "fit-content",
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
          {image && (
            <div style={{ width: "35%" }}>
              <Image
                src={image}
                height={"100%"}
                objectFit={"cover"}
                borderRadius={style.card.borderRadius.default}
              />
            </div>
          )}

          <div style={{ width: image ? "65%" : "100%" }}>
            <Text height="30px" fontSize={"2xl"} fontWeight={600}>
              {truncateString(heading, 10)}
            </Text>
            <Text>{truncateString(description, 30)}</Text>

            <FlexRow height="fit-content" hrAlign="flex-start" width="100%">
              {tags?.map((tag: string, index: number) => {
                return (
                  <TagNative
                    key={index}
                    value={tag}
                    variant="state_xmtp"
                    size="sm"
                    lineHeight="1.5"
                  />
                );
              })}
            </FlexRow>
          </div>
        </div>
      </>
    );
  };

  const verticalView = () => {
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
  };

  if (cardView == "horizontal") {
    return horizontalView();
  } else {
    return verticalView();
  }
}
