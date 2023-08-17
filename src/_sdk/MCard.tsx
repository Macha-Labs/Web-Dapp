import ButtonNative from "@/_ui/buttons/ButtonNative";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexRow from "@/_ui/flex/FlexRow";
import IconBase from "@/_ui/icons/IconsBase";
import TagNative from "@/_ui/tag/TagNative";
import { helperIPFS, truncateString } from "@/helpers";
import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { style as gStyle, style } from "../styles/StyledConstants";

type Props = {
  title?: string;
  image?: string;
  floorPrice?: string;
  description?: string;
  owner_name?: string;
  owner_image?: string;
  owner_heading?: string;
  action_name?: string;
  action_type?: string;
  action_value?: string;
  width?: string;
  onClick?: any;
  slug?: any
};

const MCard = ({
  image,
  title,
  floorPrice,
  description,
  owner_name,
  owner_heading,
  owner_image,
  action_name,
  action_type,
  action_value,
  width,
  onClick,
  slug
}: Props) => {
  const router = useRouter();

  return (
    <Box
      borderRadius={gStyle.card.borderRadius.default}
      background={gStyle.card.bg.default}
      padding={style.card.padding.default}
      marginRight={style.margin["lg"]}
      marginBottom={style.margin["lg"]}
      width={width ? width : "100%"}
      onClick={onClick}
      cursor={"pointer"}
      _hover={{
        border: `${gStyle.card.border.meta}`,
      }}
    >
      <FlexRow
        hrAlign="space-between"
        height="auto"
        vrAlign="flex-start"
        marginBottom="sm"
      >
        <TagNative size="md" value={slug}  />
      </FlexRow>

      {owner_name && (
        <FlexRow height="fit-content" hrAlign="flex-start" marginBottom={"xs"}>
          <Avatar src={owner_image} />
          <FlexColumn vrAlign="flex-start" marginLeft={"xxs"}>
            <Text mb="0">{owner_name}</Text>
            <Text mb="0">{owner_heading}</Text>
          </FlexColumn>
        </FlexRow>
      )}

      {image && (
        <div
          style={{ height: "60%", display: "flex", justifyContent: "center" }}
        >
          <Image
            src={helperIPFS(image)}
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
          marginTop={gStyle.margin["xxs"]}
        >
          {title}
        </Text>
        {description && (
          <Text
            className="m-b-0"
            fontSize={"md"}
            marginTop={gStyle.margin["xxs"]}
            width={"100%"}
          >
            {image
              ? truncateString(description, 200)
              : truncateString(description, 500)}
          </Text>
        )}
      </FlexColumn>
      {action_name && (
        <ButtonNative
          text={action_name}
          variant="state_brand"
          width="100%"
          marginTop="sm"
        />
      )}
    </Box>
  );
};

export default MCard;
