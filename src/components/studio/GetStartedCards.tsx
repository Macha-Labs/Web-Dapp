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
};

const GetStartedCards = ({ title, imageSrc, description, tag, disabled, onClick }: Props) => {
  return (
    <Box
      //   maxW="sm"
      border={style.card.border.meta}
      borderRadius={style.card.borderRadius.default}
      overflow="hidden"
      marginBottom={style.margin.md}
      marginRight={style.margin.sm}
      cursor={disabled ? "not-allowed" : "pointer"}
      onClick={onClick ? onClick : () => {}}
    >
      {/* <Image src={imageSrc} alt={title} /> */}

      <Box p="4">
        <Flex align="baseline"></Flex>
        <FlexRow hrAlign="flex-start" vrAlign="flex-start">
          <Text fontWeight={style.fontWeight.dark} mr={style.margin.xxs}>{title}</Text>
          {tag && <TagNative value={tag} size="sm" marginTop="2px" variant="grey" />}
        </FlexRow>
        <Text width="20rem" mt="2" color="gray.600">
          {description}
        </Text>
        {/* <Button mt="4" colorScheme="teal" size="sm">
          View Details
        </Button> */}
      </Box>
    </Box>
  );
};

export default GetStartedCards;
