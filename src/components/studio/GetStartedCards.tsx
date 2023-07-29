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

const GetStartedCards = ({ title, imageSrc, description, tag, disabled, onClick, image }: Props) => {
  return (
    <Box
      _hover={{border: `${style.card.border.meta}`,transform: "scale(1.01,1.01)"}}
      //   maxW="sm"
      border={style.card.border.default}
      borderRadius={style.card.borderRadius.default}
      overflow="hidden"
      marginBottom={style.margin.md}
      marginRight={style.margin.sm}
      cursor={disabled ? "not-allowed" : "pointer"}
      onClick={onClick ? onClick : () => { }}
    >
      {/* <Image src={imageSrc} alt={title} /> */}

      <Box p="4">
        <Flex align="baseline"></Flex>
        {image && <Box height="25%">
          <Image src={image} fit="contain" alt={title} height="100%" />
        </Box>}
        <FlexRow hrAlign="flex-start" vrAlign="flex-start" marginTop="sm">
          <Text fontWeight={style.fontWeight.dark} mb={0} mr={style.margin.xxs}>{title}</Text>
          {tag && <TagNative value={tag} size="sm" marginTop="2px"/>}
        </FlexRow>
        <Text width="20rem" mt={style.margin.xxs} color="gray.600">
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
