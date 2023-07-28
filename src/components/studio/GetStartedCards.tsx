import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { style } from "@/styles/StyledConstants";

type Props = {
  title?: any;
  imageSrc?: any;
  description?: any;
};

const GetStartedCards = ({ title, imageSrc, description }: Props) => {
  return (
    <Box
    //   maxW="sm"
      border={style.card.border.meta}
      borderRadius={style.card.borderRadius.default}
      overflow="hidden"
      marginBottom={style.margin.md}
      marginRight={style.margin.sm}
    >
      {/* <Image src={imageSrc} alt={title} /> */}

      <Box p="4">
        <Flex align="baseline"></Flex>

        <Text fontWeight={style.fontWeight.dark}>{title}</Text>

        <Text  width="20rem" mt="2" color="gray.600">
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
