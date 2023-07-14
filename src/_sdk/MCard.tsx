import FlexColumn from "@/_ui/flex/FlexColumn";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { style as gStyle, style } from "../styles/StyledConstants";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import TagNative from "@/_ui/tag/TagNative";
import IconBase from "@/_ui/icons/IconsBase";
import FlexRow from "@/_ui/flex/FlexRow";

type Props = {
  title?: string;
  image?: string;
  floorPrice?: string;
  description?: string;
};

const MCard = ({ image, title, floorPrice, description }: Props) => {
  return (
    <Box
      borderRadius={gStyle.card.borderRadius.default}
      border={gStyle.card.border.meta}
      background={gStyle.card.bg.default}
      height="320px"
      width="250px"
      padding={style.card.padding.default}
      marginRight={style.margin["lg"]}
      marginBottom={style.margin["lg"]}
    >
      <FlexRow hrAlign="space-between" height="auto" vrAlign="flex-start">
        <TagNative size="sm" value="Live Now" />
        <IconBase slug="icon-close" style={{ marginBottom: "sm" }} />
      </FlexRow>
      {image && (
        <div
          style={{ height: "60%", display: "flex", justifyContent: "center" }}
        >
          <Image
            src={image}
            alt="coverImage"
            width={"full"}
            objectFit={"cover"}
            borderRadius={gStyle.card.borderRadius.default}
          />
        </div>
      )}
      <FlexColumn height="auto" vrAlign="flex-start">
        <Text
          className="m-b-0"
          fontSize={"xl"}
          fontWeight={600}
          marginTop={gStyle.margin["sm"]}
        >
          {title}
        </Text>
        {description && (
          <Text
            className="m-b-0"
            fontSize={"md"}
            marginTop={gStyle.margin["sm"]}
          >
            {description}
          </Text>
        )}
        {floorPrice && (
          <Text fontSize={"xs"} fontWeight={600} color={"#246bfb"}>
            <span style={{ color: "#7c7c7c" }}>Floor Price :</span> {floorPrice}
          </Text>
        )}
      </FlexColumn>
    </Box>
  );
};

export default MCard;
