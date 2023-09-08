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
      <Box width={"100%"}>
        <FlexRow hrAlign="space-between" height="fit-content" vrAlign="flex-start">
          <FlexRow hrAlign="flex-start">
            <Image src={icon} alt="brandToken" height="50px" marginRight={style.margin.xxs}/>
            <Text fontSize={`${style.font.h4}`} marginBottom="0px">
              {description}
            </Text>
          </FlexRow>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Heading
              fontSize={style.font.h1}
              fontWeight={"600"}
              marginBottom={"0px"}
            >
              {title}
            </Heading>
          </Box>
        </FlexRow>
      </Box>
    </Box>
  );
};
export default AssetCard;
