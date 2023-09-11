import FlexRow from "@/_ui/flex/FlexRow";
import { style } from "@/styles/StyledConstants";
import { Box, Heading, Image, Text, useColorMode } from "@chakra-ui/react";

type Props = {
  icon: string;
  title: string;
  description?: string;
  onClick?: any;
};

const AssetCard = ({ title, description, icon, onClick }: Props) => {

  const { colorMode } = useColorMode()

  return (
    <Box
      className="assetCardHover"
      height="20rem"
      flex="1"
      borderRadius={style.card.borderRadius.default}
      background={colorMode == "light" ? "rgba(255,255,255,1)" : "#030c1a"}
      marginRight="10px"
      border={style.card.border.card}
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
            <Image src={icon} alt="brandToken" height="50px" marginRight={style.margin.xxs} />
            <Text color={colorMode == "light" ? "#3d3d3d" : ""} fontSize={`${style.font.h4}`} marginBottom="0px">
              {description}
            </Text>
          </FlexRow>
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <Heading
              color={colorMode == "light" ? "#3d3d3d" : ""}
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
