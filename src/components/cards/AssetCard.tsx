import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

type Props = {
  icon: string;
  title: string;
  description?: string;
  onClick?: any;
};

const AssetCard = ({ title, description, icon, onClick }: Props) => {
  return (
    <Box
      className="assetCardHover"
      height="20rem"
      flex="1"
      borderRadius={style.card.borderRadius.default}
      background="#030c1a"
      marginRight="10px"
      border={style.card.border.card}
      //   paddingLeft={`${style.padding.md}`}
      cursor={"pointer"}
      padding={`${style.padding.sm}`}
      display="flex"
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      onClick={onClick}
    >
      <Image src={icon} alt="brandToken" height="50px" />
      <Box width={"100%"}>
        <Text fontSize={`${style.font.h4}`} marginBottom="0px">
          {title}
        </Text>
        <FlexRow hrAlign="space-between" height="fit-content">
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Heading
              fontSize={style.font.h3}
              fontWeight={"600"}
              marginBottom={"0px"}
            >
              {description}
            </Heading>
          </Box>
          <Box display="flex" justifyContent="flex-end" alignItems="end">
            <Text marginBottom={"0px"}> End</Text>
          </Box>
        </FlexRow>
      </Box>
    </Box>
  );
};
export default AssetCard;
