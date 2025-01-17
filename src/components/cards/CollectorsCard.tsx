import { truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import { Box, Image, Text, useColorMode } from "@chakra-ui/react";
import Avatar from "boring-avatars";

const CollectorCard = ({ name, tag, artists, width, onClick, image }: any) => {

  const {colorMode} = useColorMode()

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: `${width}`,
        padding: `${style.padding.sm}`,
        marginRight: `${style.margin.sm}`,
        borderRadius: `${style.card.borderRadius.default}`,
        marginTop: `${style.margin.xl}`,
        border: `${colorMode == "light" ? "1px solid #e2e2e2" :  style.card.border.default}`,
        cursor: "pointer",
        transitionTimingFunction: "ease-in-out",
        transitionProperty: " all ",
        transitionDuration: "600ms",
      }}
      _hover={{
        border: `${style.card.border.hover} !important`,
        boxShadow: "-0.15px 0.15px 28px 0px #004AD9",
      }}
      onClick={onClick}
    >
      {image ? (
        <Image
          height="5rem"
          alt=""
          src={image}
          marginRight={style.margin.xs}
          borderRadius={"50%"}
          border={style.card.border.meta}
        />
      ) : (
        <Avatar size="2.5rem" name={name} variant="pixel" />
      )}
      <Box>
        <Text color={colorMode == "light" ? "3d3d3d0" : ""} style={{ fontSize: `${style.font.h6}`, marginBottom: "0px" }}>
          {name}
        </Text>
        {tag ? (
          <Text color={colorMode == "light" ? "#3d3d3d" : ""} style={{ fontSize: `${style.font.h5}`, marginBottom: "0px" }}>
            {truncateString(tag, 40)}
          </Text>
        ) : (
          <Text color={colorMode == "light" ? "#3d3d3d" : ""} mb="0px">NA</Text>
        )}
      </Box>
    </Box>
  );
};

export default CollectorCard;
