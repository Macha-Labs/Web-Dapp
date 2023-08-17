import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { style } from "@/styles/StyledConstants";
import TagNative from "@/_ui/tag/TagNative";
import FlexRow from "@/_ui/flex/FlexRow";

type Props = {
  title?: any;
  imageSrc?: any;
  description?: any;
  tag?: any;
  disabled?: boolean;
  onClick?: any;
  image?: any;
};

const GetStartedCards = ({
  title,
  imageSrc,
  description,
  tag,
  disabled,
  onClick,
  image,
}: Props) => {
  return (
    <Box
      _hover={{
        border: `${style.card.border.meta}`,
        transform: "scale(1.01,1.01)",
      }}
      //   maxW="sm"
      border={style.card.border.default}
      borderRadius={style.card.borderRadius.default}
      overflow="hidden"
      marginBottom={style.margin.md}
      marginRight={style.margin.sm}
      cursor={disabled ? "not-allowed" : "pointer"}
      onClick={onClick ? onClick : () => {}}
    >
      <Box p="4" opacity={disabled ? "0.4" : "1"}>
        <FlexRow hrAlign="flex-start" vrAlign="flex-start" >
          <Text fontWeight={style.fontWeight.dark} mb={0} mr={style.margin.xxs}>
            {title}
          </Text>
          {tag && <TagNative value={tag} size="sm" marginTop="2px" />}
        </FlexRow>
        <Text
          width="19rem"
          mt={style.margin.xxs}
          color={style.color["white.7"]}
        >
          {description}
        </Text>
        {image && (
          <Box height="25%">
            <Image
              src={image}
              fit="contain"
              alt={title}
              height=""
              width="19rem"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GetStartedCards;
