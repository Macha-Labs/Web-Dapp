import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  icon: string;
  title: string;
  description?: string;
};

const UserAssetCard = ({ title, description, icon }: Props) => {
  return (
    <Box
      height="18rem"
      flex="1"
      borderRadius={style.card.borderRadius.default}
      background={style.card.bg.overview}
      marginRight="10px"
      border={style.card.border.default}
      //   paddingLeft={`${style.padding.md}`}
      padding={`${style.padding.sm}`}
      display="flex"
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
    >
      <Image src={icon} alt="brandToken" height="50px" />
      <Box width={"100%"}>
        <Text fontSize={`${style.font.h4}`} marginBottom="0px">
          {title}
        </Text>
        <FlexRow hrAlign="space-between" height="fit-content">
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Text marginBottom={"0px"}>{description}</Text>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="end">
            <Text marginBottom={"0px"}> End</Text>
          </Box>
        </FlexRow>
      </Box>
    </Box>
  );
};
export default UserAssetCard;
