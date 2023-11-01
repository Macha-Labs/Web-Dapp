import FlexRow from "@/_ui/flex/FlexRow";
import { exploreModules } from "@/data/studio/constant";
import { truncateString } from "@/helpers";
import GlobalIcons from "@/styles/GlobalIcons";
import { style } from "@/styles/StyledConstants";
import {
  Avatar,
  Box,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";

const GraphCard = ({
  marginRight,
  image,
  title,
  user,
  tag,
  onCardClick,
}: any) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      onClick={onCardClick}
      _hover={{
        transform: "scale(1.01,1.01)",
        border: "1px solid #197cec !important",
        boxShadow: "-0.15px 0.15px 28px 0px #004AD9",
      }}
      border={
        colorMode == "light" ? "1px solid #e2e2e2" : style.card.border.default
      }
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "15rem",
        height: "18rem",
        marginBottom: `${style.margin.md}`,
        padding: `${style.padding.xs}`,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: `${style.card.borderRadius.button}`,
        marginRight: `${marginRight ? marginRight : style.margin.sm}`,
        zIndex: "2",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Box>
        <>
          <Image
            height="6rem"
            src={GlobalIcons[image]}
            alt=""
            borderRadius={"50%"}
          />
          <Image
            style={{
              position: "absolute",
              top: "1rem",
              left: "0.5rem",
              height: "10rem",
              backgroundSize: "250%",
              filter: "blur(35px)",
              backgroundImage: `url(${image})`,
              backgroundPosition: "center",
              zIndex: "-1",
              opacity: "0.64",
            }}
            src={GlobalIcons[image]}
            alt=""
          />
        </>
      </Box>
      <FlexRow vrAlign="center" hrAlign="center" marginTop="xxs">
        <Heading
          ml={1}
          mb={1}
          fontSize={style.font.h5}
          color={colorMode == "light" ? "#3d3d3d" : ""}
        >
          {user}
        </Heading>
      </FlexRow>
      <Text
        mb={2}
        fontSize={style.font.h7}
        textAlign={"center"}
        color={colorMode == "light" ? "#3d3d3d" : ""}
      >
        {truncateString(
          title
            ? title
            : exploreModules.find((module) => module.heading === user)
                ?.description,
          40
        )}
      </Text>
      <Box
        style={{
          borderRadius: "20px",
          border: "1px solid #80808030",
          padding: "5px",
        }}
      >
        <Text
          mb={0}
          fontSize="0.6rem"
          fontWeight={style.fontWeight.dark}
          color={colorMode == "light" ? "#3d3d3d" : ""}
        >
          {tag}
        </Text>
      </Box>
    </Box>
  );
};
export default GraphCard;
